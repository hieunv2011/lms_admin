import React, { useState, useEffect } from "react";
import useApi from "../../utils/useApi";
import {
  EuiPageHeader,
  EuiButton,
  EuiSpacer,
  EuiPanel,
  EuiPageSection,
  EuiBasicTable,
  EuiSteps,
  EuiIcon,
  EuiText,
  EuiButtonEmpty,
  EuiBadge,
  EuiDatePickerRange,
  EuiDatePicker,
  EuiFormRow,
} from "@elastic/eui";
import { useLocation, useParams } from "react-router-dom";
const LmsCourseDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const { getLmsExamsDetail } = useApi();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const fetchData = async () => {
    const response = await getLmsExamsDetail(id);
    setData(response.data);
    const p = Math.ceil(response.data.total / response.data.size);
    setPageCount(p > 0 ? p : 1);
  };
  console.log(data);
  useEffect(() => {
    fetchData();
  }, []);
  const steps = data.modules?.map((module, index) => ({
    title: module.name,
    children: (
      <>
        {module.items?.map((item) => (
          <div key={item.id} style={{ marginBottom: "1rem" }}>
            {item.type === "text" ? (
              <>
                <div className="flex items-center">
                  <EuiIcon type="notebookApp" size="l" />
                  <EuiText>
                    <h3>{item.name}</h3>
                  </EuiText>
                  <EuiButtonEmpty iconType="clock">
                    {item.required_time} phút
                  </EuiButtonEmpty>
                </div>
                {item.description ? (
                  <EuiText>{item.description}</EuiText>
                ) : (
                  <div className="flex items-center">
                    <EuiButtonEmpty isDisabled="true">
                      Chưa có nội dung
                    </EuiButtonEmpty>
                    <EuiButtonEmpty>Thêm nội dung</EuiButtonEmpty>
                  </div>
                )}
              </>
            ) : item.type === "practice" ? (
              <>
                <div className="flex items-center">
                  <EuiIcon type="notebookApp" size="l" />
                  <EuiText>
                    <h3>{item.name}</h3>
                  </EuiText>
                  <EuiButtonEmpty iconType="clock">
                    {item.required_time} phút
                  </EuiButtonEmpty>
                </div>
                {item.description &&
                  (() => {
                    try {
                      const descriptionData = JSON.parse(item.description);
                      return (
                        <>
                          <EuiText>
                            <strong>Số câu hỏi:</strong>{" "}
                            {descriptionData.num_of_questions}
                          </EuiText>
                          <EuiSpacer size="s" />
                          <div>
                            {descriptionData.banks?.map((bank) => (
                              <EuiBadge key={bank.id} color="hollow">
                                {bank.name}
                              </EuiBadge>
                            ))}
                          </div>
                        </>
                      );
                    } catch (e) {
                      return null;
                    }
                  })(
                    <div>
                      <EuiText>Chưa có nội dung</EuiText>
                      <EuiButtonEmpty>Thêm nội dung</EuiButtonEmpty>
                    </div>
                  )}
              </>
            ) : item.type === "meeting" ? (
              <>
                <div className=" flex items-center">
                  <EuiIcon type="notebookApp" size="l" />
                  <EuiText>
                    <h3>{item.name}</h3>
                  </EuiText>
                  <EuiButtonEmpty iconType="clock">
                    {item.required_time} phút
                  </EuiButtonEmpty>
                </div>
                <EuiSpacer size="s" />
                <div className="flex items-center space-x-2">
                  <EuiBadge color="primary">{item.name}</EuiBadge>
                  {item.description &&
                    (() => {
                      try {
                        const descriptionData = JSON.parse(item.description);
                        const startTime = new Date(
                          descriptionData.start_time
                        ).toLocaleString();
                        const endTime = new Date(
                          descriptionData.end_time
                        ).toLocaleString();
                        return (
                          <>
                            <strong>Thời gian diễn ra:</strong> {startTime} -{" "}
                            {endTime}
                          </>
                        );
                      } catch (e) {
                        return null;
                      }
                    })(
                      <div>
                        <EuiText>Chưa có nội dung</EuiText>
                        <EuiButtonEmpty>Thêm nội dung</EuiButtonEmpty>
                      </div>
                    )}
                </div>
              </>
            ) : item.type === "video" ? (
              <>
                <div className="flex items-center">
                  <EuiIcon type="videoPlayer" size="l" />
                  <EuiText>
                    <h3>{item.name}</h3>
                  </EuiText>
                  <EuiButtonEmpty iconType="clock">
                    {item.required_time} phút
                  </EuiButtonEmpty>
                </div>
                {item.description
                  ? (() => {
                      try {
                        const descriptionData = JSON.parse(item.description);
                        const videoUrl = descriptionData?.url;
                        if (videoUrl) {
                          const videoId = videoUrl.split("/").pop();
                          const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                          return (
                            <EuiPanel>
                              <iframe
                                width="100%"
                                height="315"
                                src={embedUrl}
                                title="Video bài học"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            </EuiPanel>
                          );
                        } else {
                          return <EuiText>No valid video URL</EuiText>;
                        }
                      } catch (e) {
                        return <EuiText>Error parsing video URL</EuiText>;
                      }
                    })()
                  : null}
              </>
            ) : (
              <div>
                <h3>{item.name}</h3>
                <EuiText>{item.description}</EuiText>
              </div>
            )}
          </div>
        ))}
        <EuiButton fullWidth> Thêm</EuiButton>
      </>
    ),
  }));

  return (
    <>
      <EuiPageHeader
        pageTitle={data.name}
        iconType="logoKibana"
        bottomBorder={true}
        restrictWidth={false}
        description={"Danh sách bài học của khoá học " + data.name}
      />
      <EuiSpacer />
      <EuiPageSection>
        {steps && steps.length > 0 ? (
          <EuiSteps steps={steps} />
        ) : (
          <p>Không có module nào để hiển thị.</p>
        )}
      </EuiPageSection>
    </>
  );
};

export default LmsCourseDetail;
