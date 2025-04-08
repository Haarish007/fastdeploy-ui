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
  Loader,
  Grid,
} from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import {
  IconSearch,
  IconCloudUpload,
  IconX,
  IconPhoto,
  IconFileText,
  IconFileZip,
  IconUpload,
  IconCheck,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { getBucket, getDomain } from "../../Services/bucket.service";
import { uploadFile } from "../../Services/fileUpload.service";
import toast from "react-hot-toast";
import useBucketStore from "../Store/useBucketStore";
import useDomainStore from "../Store/useDomainStore";

const Dashboard = () => {
  const theme = useMantineTheme();
  const [files, setFiles] = useState([]);
  const [fileUpload, setFileUpload] = useState(false);
  const { selectedBucket, setSelectedBucket } = useBucketStore();
  const { selectedDomain, setSelectedDomain } = useDomainStore();
  const [fileStatus, setFileStatus] = useState(false);


  const { data: bucketData } = useQuery({
    queryKey: ["get-bucket-data"],
    queryFn: () => getBucket(),
  });

  console.log('bucketData', bucketData);


  const { data: domainData } = useQuery({
    queryKey: ["get-domain-data"],
    queryFn: () => getDomain(),
  });

  const handleDrop = async (acceptedFiles: FileWithPath[]) => {

    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    await handleFileUpload(acceptedFiles);
  };

  const handleFileUpload = async (files: FileWithPath[]) => {
    if (!files.length) return;
    setFileUpload(true);

    try {
      const response = await uploadFile(files);
      const { status, message, errors } = response.data;

      if (status === "success") {
        toast.success(message);
        setFileStatus(true);
      } else {
        toast.error(message || "Upload failed");
        setFileStatus(false);
      }

      if (errors?.length) {
        errors.forEach(err => toast.error(err));
        setFileStatus(false);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading files");
      setFileStatus(false);
    } finally {
      setFileUpload(false);
    }
  };

  // const removeFile = (index: number) => {
  //   setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  // };

  // const getFileIcon = (file: FileWithPath) => {
  //   const fileType = file.type.split("/")[0];
  //   switch (fileType) {
  //     case "image":
  //       return <IconPhoto size={24} color={theme.colors.blue[5]} />;
  //     case "application":
  //       return <IconFileZip size={24} color={theme.colors.orange[5]} />;
  //     default:
  //       return <IconFileText size={24} color={theme.colors.gray[5]} />;
  //   }
  // };

  const bucketList = bucketData?.data || [];
  const domainList = domainData?.data || [];


  return (
    <Paper shadow="xs" p="md" m={10} radius="md" withBorder>
      <Grid>
        <Grid.Col span={6} >
      <Title order={4} mb="sm">Bucket Name</Title>
      <Select
        placeholder="Select Bucket"
        size="md"
        radius="md"
        searchable
        leftSection={<IconSearch size={18} />}
        data={bucketList.map((bucket: string) => ({
          value: bucket,
          label: bucket,
        }))}
        onChange={(value: string | null) => {
          if (value) setSelectedBucket(value);
        }}
      />
</Grid.Col>
<Grid.Col span={6} >
  
      <Title order={4} mb="sm">Domain Name</Title>
      <Select
        searchable
        placeholder="Select Domain"
        size="md"
        radius="md"
        leftSection={<IconSearch size={18} />}
        data={domainList.map((domain: string) => ({
          value: domain,
          label: domain,
        }))}
        onChange={(value: string | null) => {
          if (value) setSelectedDomain(value);
        }}
      />
      </Grid.Col>
      </Grid>

      <Box mt="md">
        <Title order={4} mb="sm">Upload Files</Title>
        <Dropzone
          onDrop={handleDrop}
          maxSize={30 * 1024 ** 2}
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
            <Dropzone.Accept>
              <IconUpload size={40} strokeWidth={1.5} color='#ccc' />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={40} strokeWidth={1.5} color={theme.colors.red[6]} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              {fileUpload ? (
                <Loader type="bars" size="md" color={'pink'} />
              ) : fileStatus ? (
                <IconCheck style={{ width: 30, height: 30 }} stroke={1.5} color="green" />
              ) : (
                <IconCloudUpload
                  color={'#ccc'}
                  style={{ width: 30, height: 30 }}
                  stroke={1.5}
                />
              )}
            </Dropzone.Idle>
          <Text ta='center' fz='md' mt='xs' c='dimmed'>
            Drag&apos;n&apos;Drop file here to upload. Accept Only
            <i>.zip</i> files (Max 30MB).
          </Text>
          </Group>
        </Dropzone>
      </Box>

      {/* {files.length > 0 && (
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
        )} */}

  {/* <Group justify="flex-end" mt="md">
          <Button
            variant="filled"
            disabled={files.length === 0}
            color="blue"
          >
            Upload {files.length > 0 ? `(${files.length})` : ""}
          </Button>
        </Group> */}

    </Paper >
  );
};

export default Dashboard;
