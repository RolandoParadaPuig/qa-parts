import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Radio,
  Row,
  Select,
  Upload,
  Typography,
} from "antd";
import moment from "moment";
import "./firstArticle.css";
import { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getFirestore, doc, setDoc, Timestamp } from "firebase/firestore";
const db = getFirestore();
const storage = getStorage();
const { Text, Title } = Typography;
const Option = Select;
const { TextArea } = Input;
export const FirstArticle = () => {
  const [send, setSend] = useState(false);
  const [AONvalue, setAONValue] = useState(null);
  const [fileProgress, setFileProgress] = useState(false);

  const props = {
    accept: "application/pdf",
    maxCount: 1,
    beforeUpload: (file) => {
      const isPDF = file.type === "application/pdf";
      if (!isPDF) {
        message.error(`${file.name} is not a pdf file`);
      }
      return isPDF;
    },
    onChange({ file, fileList }) {
      file.status = "done";
      file.progres = 100;
    },
    customRequest: async (e) => {
      const file = e.file;
    },
  };

  const onChangeApprovedOrNot = (e) => {
    setAONValue(e.target.value);
  };
  function onChange(date, dateString) {
    console.log(date, dateString);
  }
  function handleChange(value) {}
  const [form] = Form.useForm();
  const onTextAreaChange = (e) => {
    console.log("Change:", e.target.value);
  };
  const onFinish = async (values) => {
    setSend(true);
    const file = values.pdfLink.fileList[0]?.originFileObj;
    let URLFile;
    if (file) {
      setFileProgress(true);
      const storageRef = ref(storage, `/${file.name}`);
      const name = `${file.name}`;
      const uploadTask = await uploadBytesResumable(storageRef, file)
        .then((status) => {
          message.success(`${name} upload Succesfully`);
          setFileProgress(false);
        })
        .catch((error) => {
          setFileProgress(false);
        });

      const urlRef = await getDownloadURL(storageRef)
        .then((url) => {
          URLFile = url;
        })
        .catch((error) => {});
      {
        AONvalue
          ? await setDoc(doc(db, "firstArticle", `${values.reportNumber}`), {
              date: Timestamp.fromDate(values.date._d),
              reportNumber: values.reportNumber,
              partNumber: values.partNumber,
              partName: values.partName,
              vendor: values.vendor,
              pdfLink: URLFile,
              approvedOrNot: values.approvedOrNot,
            })
              .then(() => {
                message.success(`${values.partName} data successfully send`);
                onReset();
                setSend(false);
              })
              .catch((error) => {
                setSend(false);
              })
          : await setDoc(doc(db, "firstArticle", `${values.reportNumber}`), {
              date: Timestamp.fromDate(values.date._d),
              reportNumber: values.reportNumber,
              partNumber: values.partNumber,
              partName: values.partName,
              vendor: values.vendor,
              pdfLink: URLFile,
              approvedOrNot: values.approvedOrNot,
              notes: values.notes,
            })
              .then(() => {
                message.success(`${values.partName} data successfully send`);
                onReset();
                setSend(false);
              })
              .catch((error) => {
                setSend(false);
              });
      }
    } else {
      message.error("Please upload your PDF file!");
      setSend(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Finish the First Article before submit it");
  };
  const onReset = () => {
    form.resetFields();
  };
  form.setFieldsValue({
    date: moment(),
  });
  useEffect(() => {
    console.log(AONvalue);
  }, [AONvalue]);
  return (
    <Row justify="center">
      <Col md={10} sm={16} xs={24} className="first-article-form">
        <Form
          form={form}
          name="firstArticle"
          initialValues={{ remember: true }}
          labelCol={{ span: 6 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row justify="center">
            <Col
              md={22}
              xs={24}
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "0 0 1em 0",
              }}
            >
              <Title level={3}>First Article</Title>
            </Col>
            <Col md={22} xs={16}>
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Please input the Date!" }]}
              >
                <DatePicker onChange={onChange} format="MM/DD/YYYY" disabled />
              </Form.Item>
            </Col>

            <Col md={22} xs={16}>
              <Form.Item
                label="Report Number"
                name="reportNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input The Report Number!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col md={22} xs={16}>
              <Form.Item
                label="Part Number"
                name="partNumber"
                rules={[
                  { required: true, message: "Please input The Part Number!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col md={22} xs={16}>
              <Form.Item
                label="Part Name"
                name="partName"
                rules={[
                  { required: true, message: "Please input The Part Name!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col md={22} xs={16}>
              <Form.Item
                label="Vendor"
                name="vendor"
                rules={[{ required: true, message: "Please select a vendor!" }]}
              >
                <Select onChange={handleChange}>
                  <Option value="lakeForest">Lake Forest</Option>
                  <Option value="vendor2">Vendor2</Option>
                  <Option value="vendor3">Vendor3</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={22} xs={16}>
              <Form.Item
                label=".Pdf file Upload"
                name="pdfLink"
                rules={[
                  { required: true, message: "Please upload your PDF file!" },
                ]}
              >
                <Upload {...props}>
                  <Button loading={fileProgress} icon={<UploadOutlined />}>
                    Click to Upload
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col md={22} xs={16}>
              <Form.Item
                label="Aproved or Not"
                name="approvedOrNot"
                rules={[{ required: true, message: "Is this part approved?" }]}
              >
                <Radio.Group onChange={onChangeApprovedOrNot} value={AONvalue}>
                  <Radio value={true}>Approved</Radio>
                  <Radio value={false}>Not Approved</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            {AONvalue == false ? (
              <Col md={22} xs={16}>
                {" "}
                <Form.Item
                  label="Notes"
                  name="notes"
                  rules={[{ required: true, message: "Pleace Input a note" }]}
                >
                  <TextArea
                    showCount
                    maxLength={100}
                    style={{ height: 60 }}
                    onChange={onTextAreaChange}
                  />
                </Form.Item>{" "}
              </Col>
            ) : (
              ""
            )}
            <Col md={22} xs={16}>
              <Form.Item>
                <Button
                  disabled={send}
                  loading={send}
                  type="primary"
                  htmlType="submit"
                  block
                >
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};
