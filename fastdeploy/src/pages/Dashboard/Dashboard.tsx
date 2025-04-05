import { useState } from "react";
import {
  Title,
  Text,
  Group,
  Box,
  Paper,
  Select,
  Flex,
  Badge,
  ActionIcon,
  useMantineTheme,
  Button,
} from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import {
  IconSearch,
  IconCloudUpload,
  IconX,
  IconPhoto,
  IconFileText,
  IconFileZip,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { getBucket, getDomain } from "../../Services/bucket.service";
import { uploadFile } from "../../Services/fileUpload.service";
import toast from "react-hot-toast";

const Dashboard = () => {
  const theme = useMantineTheme();
  const [files, setFiles] = useState([]);
  const [fileUpload, setFileUpload] = useState(false);
  const [selectedBucket, setSelectedBucket] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);

  const { data: bucketData } = useQuery({
    queryKey: ["get-bucket-data"],
    queryFn: getBucket,
  });

  const { data: domainData } = useQuery({
    queryKey: ["get-domain-data"],
    queryFn: getDomain,
  });

  const handleDrop = async (acceptedFiles: FileWithPath[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    await handleFileUpload(acceptedFiles);
  };

  const handleFileUpload = async (files: FileWithPath[]) => {
    if (!files.length) return;
    setFileUpload(true);

    try {
      const results = await Promise.all(files.map(uploadFile));
      results.forEach(({ status, message }) =>
        status === "success" ? toast.success(message) : toast.error(message || "Upload failed")
      );
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading files");
    } finally {
      setFileUpload(false);
    }
  };


  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const getFileIcon = (file: FileWithPath) => {
    const fileType = file.type.split("/")[0];
    switch (fileType) {
      case "image":
        return <IconPhoto size={24} color={theme.colors.blue[5]} />;
      case "application":
        return <IconFileZip size={24} color={theme.colors.orange[5]} />;
      default:
        return <IconFileText size={24} color={theme.colors.gray[5]} />;
    }
  };

  return (
    <Paper shadow="xs" p="md" m={20} radius="md" withBorder>
      <Title order={4} mb="sm">Bucket Name</Title>
      <Select
        placeholder="Select Bucket"
        size="md"
        radius="md"
        leftSection={<IconSearch size={18} />}
        value={selectedBucket}
        onChange={setSelectedBucket}
        data={bucketData?.map((bucket: any) => ({ label: bucket.name, value: bucket.id })) || []}
        mb="sm"
        maw={800}
      />

      <Title order={4} mb="sm">Domain Name</Title>
      <Select
        placeholder="Select Domain"
        size="md"
        radius="md"
        leftSection={<IconSearch size={18} />}
        value={selectedDomain}
        onChange={setSelectedDomain}
        data={domainData?.map((domain: any) => ({ label: domain.name, value: domain.id })) || []}
        mb="sm"
        maw={800}
      />

      <Box mt="md">
        <Title order={4} mb="sm">Upload Files</Title>
        <Dropzone
          onDrop={handleDrop}
          maxSize={5 * 1024 ** 2}
          accept={["application/zip", "application/x-zip-compressed", "application/octet-stream"]}
          styles={{
            root: {
              borderStyle: "dashed",
              cursor: "pointer",
              "&:hover": { backgroundColor: "#D8DDE2" },
            },
          }}
        >

          <Group justify="center" gap="xl" style={{ minHeight: 140, pointerEvents: "none" }}>
            <IconCloudUpload size={40} strokeWidth={1.5} color={theme.colors.gray[5]} />
            <Box>
              <Text size="xl">Drag files here or click to select</Text>
              <Text size="sm" c="dimmed" mt={7}>
                Accept Only .zip files
              </Text>
            </Box>
          </Group>
        </Dropzone>

        {files.length > 0 && (
          <Box mt="lg">
            <Text fw={500} size="sm" mb="xs">
              Uploaded Files ({files.length})
            </Text>
            <Paper withBorder p="md" radius="md">
              {files.map((file, index) => (
                <Flex key={index} align="center" justify="space-between" style={{ borderTop: index ? "1px solid dark" : "none", padding: "10px 0" }}>
                  <Group>
                    {getFileIcon(file)}
                    <Box>
                      <Text size="sm" fw={500} lineClamp={1}>{file.name}</Text>
                      <Text size="xs" c="dimmed">{(file.size / 1024).toFixed(2)} KB</Text>
                    </Box>
                  </Group>
                  <Group>
                    <Badge color={file.type.includes("image") ? "blue" : "gray"}>
                      {file.type.split("/")[1]?.toUpperCase() || "FILE"}
                    </Badge>
                    <ActionIcon color="red" variant="subtle" onClick={() => removeFile(index)}>
                      <IconX size={16} />
                    </ActionIcon>
                  </Group>
                </Flex>
              ))}
            </Paper>
          </Box>
        )}

        <Group justify="flex-end" mt="md">
          <Button
            variant="filled"
            disabled={files.length === 0}
            color="blue"
          >
            Upload {files.length > 0 ? `(${files.length})` : ""}
          </Button>
        </Group>
      </Box>
    </Paper>
  );
};

export default Dashboard;
