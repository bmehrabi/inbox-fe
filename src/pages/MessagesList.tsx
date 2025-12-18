import {Alert, Button, Col, Table} from "antd";
import Container from "../components/container";
import {useQuery} from "@tanstack/react-query";
import {MessagesApi} from '../api';
import {useNavigate} from "react-router-dom";
import AddMessageModal from "../components/AddMessageModal";
import {useState} from "react";

const api = new MessagesApi();

const MessagesList = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = [
    { title: 'Subject', dataIndex: 'subject', key: 'subject' },
    {
      title: 'Created At',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];
  const { data: messages, isLoading, error } = useQuery({
    queryKey: ['messages'] as const,
    queryFn: () => api.findAll(),
  });

  if (error) return <Alert type="error" title={error.message} />;

  return (
    <Container>
      <Col>
        <h1>Messages</h1>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add Message
        </Button>
        <AddMessageModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <Table
          loading={isLoading}
          dataSource={messages}
          columns={columns}
          rowKey="id"
          onRow={(record) => ({
            onClick: () => navigate(`/message/${record.id}`),
            style: { cursor: 'pointer' },
          })}
        />
      </Col>
    </Container>
  )
}

export default MessagesList;