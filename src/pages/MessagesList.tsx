import {Col, Table} from "antd";
import Container from "../components/container";

const MessagesList = () => {
  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
  ];
  const messages: {title: string, createdAt: string, id: number}[] = [
    {title: 'title', id: 1, createdAt: '18.12.2025'},
  ]

  return (
    <Container>
      <Col>
        <h1>Messages</h1>
        <Table dataSource={messages} columns={columns} rowKey="id" />
      </Col>
    </Container>
  )
}

export default MessagesList;