import Container from "../components/container";
import {Alert, Button, Card, Space, Spin, Typography} from "antd";
import {useParams,useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {MessagesApi} from "../api";

const { Title, Paragraph } = Typography;
const api = new MessagesApi();

const MessageDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch message details
  const { data: message, isLoading, error } = useQuery({
    queryKey: ['message', id] as const,
    queryFn: () => api.findById({ id: Number(id) }),
    enabled: !!id,
  });

  if (isLoading) return <Spin tip="Loading message..." style={{ display: 'block', margin: '100px auto' }} />;
  if (error instanceof Error) return <Alert type="error" title={error.message} />;

  if (!message) return <Alert type="info" title="Message not found" />;

  return (
    <Container>
      <h1>Message Details</h1>
      <Card>
        <Title level={3}>{message.subject}</Title>
        <Paragraph>{message.text}</Paragraph>
        Created: {message.createdDate ? new Date(message.createdDate).toLocaleDateString() : 'N/A'}
        <div style={{ marginTop: 24, textAlign: 'right' }}>
          <Space>
            <Button type="primary" onClick={() => navigate('/')}>
              Back
            </Button>
          </Space>
        </div>
      </Card>
    </Container>
  )
}

export default MessageDetails;