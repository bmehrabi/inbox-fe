import React from 'react';
import {Form, Input, message as antdMessage, Modal} from 'antd';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {MessageRequestDTO, MessagesApi} from '../api';

const api = new MessagesApi();

interface AddMessageModalProps {
  open: boolean;
  onClose: () => void;
}

const AddMessageModal: React.FC<AddMessageModalProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (newMessage: MessageRequestDTO) => api.create({ messageRequestDTO: newMessage }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      antdMessage.success('Message created successfully!');
      form.resetFields();
      onClose();
    },
    onError: (err: any) => {
      antdMessage.error(err.message || 'Failed to create message');
    },
  });

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        createMutation.mutate(values as MessageRequestDTO);
      })
      .catch(() => {
        // validation failed
      });
  };

  return (
    <Modal
      title="Add New Message"
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      confirmLoading={createMutation.isPending}
      okText="Create"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Subject"
          name="subject"
          rules={[{ required: true, message: 'Please enter a subject' }, { max: 40, message: 'Max 40 characters' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Text"
          name="text"
          rules={[{ required: true, message: 'Please enter the message text' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddMessageModal;
