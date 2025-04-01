import { useState } from "react"
import {
  Text,
  Title,
  TextInput,
  Group,
  Button,
  Box,
  rem,
  Paper,
  Flex,
  Badge,
  ActionIcon,
  useMantineTheme,
  Select,
} from "@mantine/core"
import { Dropzone, type FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { IconSearch, IconUpload, IconX, IconFileText, IconPhoto, IconFileZip, IconCloudUpload } from "@tabler/icons-react"

 const Dashboard = ()=>{
  const [searchQuery, setSearchQuery] = useState("")
  const [files, setFiles] = useState<FileWithPath[]>([])
  const theme = useMantineTheme()

  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
  }

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  const getFileIcon = (file: FileWithPath) => {
    const fileType = file.type.split("/")[0]

    switch (fileType) {
      case "image":
        return <IconPhoto size={24} color={theme.colors.blue[5]} />
      case "application":
        return <IconFileZip size={24} color={theme.colors.orange[5]} />
      default:
        return <IconFileText size={24} color={theme.colors.gray[5]} />
    }
  }

  return (
    <Paper shadow="xs" p="md" m={20} radius="md" withBorder>
      <Title order={4} mb="sm">
        Bucket Name
      </Title>

      <Select
        placeholder="Search for documents..."
        size="md"
        radius="md"
        leftSection={<IconSearch size={18} />}
        value={searchQuery}
        onChange={(e:any) => setSearchQuery(e.currentTarget.value)}
        mb="sm"
        maw={800}
      />
       <Text size="sm" c="dimmed" mb="md">
        Bucket Name
      </Text>
      <Title order={4} mb="sm">
        Domain Name
      </Title>

      <Select
        placeholder="Search for documents..."
        size="md"
        radius="md"
        leftSection={<IconSearch size={18} />}
        value={searchQuery}
        onChange={(e:any) => setSearchQuery(e.currentTarget.value)}
        mb="sm"
        maw={800}
      />

      <Text size="sm" c="dimmed" mb="md">
        Domain Name
      </Text>

      <Box mt="md">
      <Title order={6} mb="sm">
        Upload Files
      </Title>

        <Dropzone
          onDrop={handleDrop}
          onReject={(files) => console.log("rejected files", files)}
          maxSize={5 * 1024 ** 2}
          accept={[
            ...IMAGE_MIME_TYPE,
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          ]}
          styles={{
            root: {
              borderStyle: 'dashed',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: "#ccc" ,
              },
            },
          }}
        >
          <Group justify="center" gap="xl" style={{ minHeight: rem(140), pointerEvents: "none" }}>
            <IconCloudUpload size={40} strokeWidth={1.5} color={theme.colors.gray[5]} />
            <Box>
              <Text size="xl" inline>
                Drag files here or click to select files
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                Attach as many files as you need. Each file should not exceed 5MB
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
                <Flex
                  key={index}
                  align="center"
                  justify="space-between"
                  style={{ 
                    paddingTop: theme.spacing.sm,
                    paddingBottom: theme.spacing.sm,
                    borderTop: index !== 0 ? `1px solid dark` : 'none'
                  }}
                >
                  <Group>
                    {getFileIcon(file)}
                    <Box>
                      <Text size="sm" fw={500} lineClamp={1}>
                        {file.name}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {(file.size / 1024).toFixed(2)} KB
                      </Text>
                    </Box>
                  </Group>
                  <Group>
                    <Badge color={file.type.includes("image") ? "blue" : "gray"}>
                      {file.type.split("/")[1]?.toUpperCase() || 'FILE'}
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
  )
}

export default Dashboard;