import React, { useState, useEffect } from "react";

import { Table, Button, Form, Input } from "antd";

const App = () => {
  useEffect(() => {
    const data = [];

    for (let i = 0; i < 7; i++) {
      data.push({
        key: `${i}`,
        name: `name${i}`,
        address: `address${i}`,
      });
    }

    setDataSource(data);
  }, []);

  const [dataSource, setDataSource] = useState([]);

  const [editingRow, setEditingRow] = useState(null);

  const [form] = Form.useForm();

  const onFinish = values => {
    // console.log(values);

    const updatedDataSource = [...dataSource];
    updatedDataSource.splice(editingRow, 1, { ...values, key: editingRow });
    setDataSource(updatedDataSource);
    setEditingRow(null);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
      render(name, record) {
        if (editingRow == record.key) {
          return (
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please Enter your name",
                },
              ]}
            >
              <Input size="small" />
            </Form.Item>
          );
        } else {
          return name;
        }
      },
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      align: "center",
      render(address, record) {
        if (editingRow == record.key) {
          return (
            <Form.Item
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please Enter your address",
                },
              ]}
            >
              <Input size="small" />
            </Form.Item>
          );
        } else {
          return address;
        }
      },
    },
    {
      title: "Actions",
      align: "center",
      render(_, record) {
        return (
          <>
            <Button
              onClick={() => {
                console.log(record.key);
                setEditingRow(record.key);
                form.setFieldsValue({
                  name: record.name,
                  address: record.address,
                });
              }}
            >
              Edit
            </Button>
            <Button htmlType="submit">Save</Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Form form={form} onFinish={onFinish}>
        <Table
          size="small"
          bordered={true}
          columns={columns}
          dataSource={dataSource}
        />
      </Form>
    </>
  );
};

export default App;
