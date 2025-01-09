import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiCard,
  EuiIcon,
  EuiButton,
  EuiButtonIcon,
  EuiPageTemplate,
} from "@elastic/eui";
import { useNavigate } from "react-router-dom";
import KibanaLayout from "../layouts/kibana";
import khoahoc from "../assets/khoahoc.jpg";
import cauhoi from "../assets/cauhoi.png";
import bode from "../assets/bode.png";
import baocao from "../assets/baocao.jpg";

const Home = () => {
  const navigate = useNavigate();
  return (
    // <KibanaLayout
    //   template="empty"
    //   pageHeader={{
    //     pageTitle: 'Xin chào',
    //   }}>
    <EuiPageTemplate restrictWidth="false">
      <EuiPageTemplate.Header
        pageTitle="Xin chào Admin"
        iconType="logoKibana"
        description="This description should be describing the current page as depicted by the page title. It will never extend beneath the right side content."
        rightSideItems={[
          <EuiButton fill>Add something</EuiButton>,
          <EuiButton>Do something</EuiButton>,
        ]}
      />
      <EuiPageTemplate.Section>
        <EuiFlexGroup gutterSize="l">
          <EuiFlexItem>
            <EuiCard
              icon={<EuiIcon size="xxl" type="training" color="white" />}
              title="KHOÁ HỌC"
              image={
                <img
                  src={khoahoc}
                  alt="Course"
                  style={{
                    width: "400px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              }
              description="Xem danh sách các khoá học"
              footer={
                <EuiButton
                  onClick={() => {
                    navigate("/courses");
                  }}
                  className="w-full"
                >
                  Lựa chọn
                </EuiButton>
              }
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
              icon={<EuiIcon size="xxl" type="dashboardApp" />}
              title="CÂU HỎI"
              image={
                <img
                  src={cauhoi}
                  alt="Course"
                  style={{
                    width: "400px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              }
              description="Xem danh sách câu hỏi"
              footer={
                <EuiButton
                  onClick={() => {
                    navigate("/questions");
                  }}
                  className="w-full"
                >
                  Lựa chọn
                </EuiButton>
              }
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
              icon={<EuiIcon size="xxl" type="casesApp" />}
              title="BỘ ĐỀ"
              image={
                <img
                  src={bode}
                  alt="Course"
                  style={{
                    width: "400px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              }
              description="Xem danh sách bộ đề"
              footer={
                <EuiButton
                  onClick={() => {
                    navigate("/qb");
                  }}
                  className="w-full"
                >
                  Lựa chọn
                </EuiButton>
              }
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
              icon={<EuiIcon size="xxl" type="notebookApp" />}
              title="BÁO CÁO"
              image={
                <img
                  src={baocao}
                  alt="Course"
                  style={{
                    width: "400px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              }
              description="Xem báo cáo"
              footer={
                <EuiButton
                  onClick={() => {
                    navigate("/reports");
                  }}
                  className="w-full"
                >
                  Lựa chọn
                </EuiButton>
              }
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
              icon={<EuiIcon size="xxl" type="notebookApp" />}
              title="Bài giảng"
              image={
                <img
                  src={baocao}
                  alt="Course"
                  style={{
                    width: "400px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              }
              description="Xem các bài giảng lý thuyết"
              footer={
                <EuiButton
                  onClick={() => {
                    navigate("/lmscourse");
                  }}
                  className="w-full"
                >
                  Lựa chọn
                </EuiButton>
              }
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageTemplate.Section>
    </EuiPageTemplate>
    // </KibanaLayout>
  );
};

export default Home;
