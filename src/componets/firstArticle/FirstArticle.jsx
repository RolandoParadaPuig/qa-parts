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
  Alert,
} from "antd";
import { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { getFirestore, doc, setDoc, Timestamp } from "firebase/firestore";
const db = getFirestore();
const storage = getStorage();
const { Text, Title } = Typography;
const Option = Select;
export const FirstArticle = () => {
  const [send, setSend] = useState(false);
  const [AONvalue, setAONValue] = useState(false);

  const [fileUpload, setFileUpload] = useState(false);
  const [fileProgress, setFileProgress] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const props = {
    accept: "application/pdf",
    action: "none",

    beforeUpload: (file) => {
      const isPDF = file.type === "application/pdf";
      if (!isPDF) {
        message.error(`${file.name} is not a pdf file`);
      }
      return isPDF;
    },
    onChange({ file, fileList }) {
      file.status = "success";
    },

    customRequest: async (e) => {
      const file = e.file;

      if (file) {
        setFileUpload(true);
        setFileProgress(true);
        // setUpLoadDisabled(true);
        // setImageLoading(true);
        const storageRef = ref(storage, `/${file.name}`);
        const name = `${file.name}`;
        setFileName(name);
        const uploadTask = await uploadBytesResumable(storageRef, file)
          .then((status) => {
            console.log(status.state);
            message.success(`${file.name} upload Succesfully`);
            setFileProgress(false);
          })
          .catch((error) => {
            setFileProgress(false);
          });

        const urlRef = await getDownloadURL(storageRef)
          .then((url) => {
            console.log(url);
            setFileUrl(url);
          })
          .catch((error) => {});
      }
    },
    onRemove: async ({ file }) => {
      setFileProgress(true);

      const storageRef = ref(storage, `/${fileName}`);
      await deleteObject(storageRef)
        .then(() => {
          message.success(fileName, ": file deleted");
          setFileProgress(false);
          setFileUpload(false);
        })
        .catch((error) => {
          message.error("Could not find the file on database");
          setFileProgress(false);
          setFileUpload(false);
        });
    },
  };

  const onChangeApprovedOrNot = (e) => {
    console.log("radio checked", e.target.value);
    setAONValue(e.target.value);
  };
  function onChange(date, dateString) {
    console.log(date, dateString);
  }
  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const onFinish = async (values) => {
    values.pdfLink = fileUrl;
    console.log("Success:", values);
    await setDoc(doc(db, "firstArticle", `${values.reportNumber}`), {
      date: Timestamp.fromDate(values.date._d),
      reportNumber: values.reportNumber,
      partNumber: values.partNumber,
      partName: values.partName,
      vendor: values.vendor,
      pdfLink: values.pdfLink,
      approvedOrNot: values.approvedOrNot,
    }).then(() => {
      message.success(`${values.partName} data successfully send`);
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {}, [fileUpload]);
  return (
    <Row justify="center">
      <Col md={10} sm={16} xs={20} className="first-article-form">
        <Form
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
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "0 0 1em 0",
              }}
            >
              <Title level={3}>First Article</Title>
            </Col>
            <Col md={22}>
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Please input the Date!" }]}
              >
                <DatePicker onChange={onChange} />
              </Form.Item>
            </Col>

            <Col md={22}>
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
            <Col md={22}>
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
            <Col md={22}>
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
            <Col md={22}>
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
            <Col md={22}>
              <Form.Item
                label=".Pdf file Upload"
                name="pdfLink"
                rules={[
                  { required: true, message: "Please upload your PDF file!" },
                ]}
              >
                <Upload {...props}>
                  <Button
                    disabled={fileUpload}
                    loading={fileProgress}
                    icon={<UploadOutlined />}
                  >
                    Click to Upload
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col md={22}>
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

            <Col md={22}>
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
