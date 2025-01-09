import React, { useState, useEffect, useRef } from "react";
import {
  EuiCard,
  EuiPagination,
  EuiSpacer,
  EuiImage,
  EuiFlexItem,
  EuiFlexGroup,
  EuiIcon,
  EuiText,
  EuiBasicTable,
  EuiPanel,
} from "@elastic/eui";
import KibanaLayout from "../layouts/kibana";
import useApi from "../utils/useApi";
import QuestionFilter from "./Form/QuestionFilter";

const Questions = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const filters = useRef({ subject_id: 0, chapter_id: 0, q: "" });

  const { getQuestions } = useApi();

  const loadQuestions = async (currentPage) => {
    const response = await getQuestions({
      ...filters.current,
      page: currentPage,
    });
    setData(response.data.items);
    const p = Math.ceil(response.data.total / response.data.size);
    if (p <= 1) {
      setPageCount(1);
    } else {
      setPageCount(p);
    }
  };

  useEffect(() => {
    loadQuestions(page);
  }, [page]);

  const doSearch = (params) => {
    filters.current = params;
    loadQuestions(1);
    setPage(1);
  };

  // Columns cho EuiBasicTable
  const columns = [
    {
      field: "B1",
      name: "B1",
      render: (B1) => <EuiIcon type={B1 ? "check" : "cross"} />,
      textAlign: "center",
    },
    {
      field: "B2",
      name: "B2",
      render: (B2) => <EuiIcon type={B2 ? "check" : "cross"} />,
      textAlign: "center",
    },
    {
      field: "C",
      name: "C",
      render: (C) => <EuiIcon type={C ? "check" : "cross"} />,
      textAlign: "center",
    },
    {
      field: "DEF",
      name: "DEF",
      render: (DEF) => <EuiIcon type={DEF ? "check" : "cross"} />,
      textAlign: "center",
    },
  ];

  return (
    <>
      <EuiPanel>
        <QuestionFilter onSearch={doSearch} />
      </EuiPanel>
      <EuiSpacer />
      <EuiPanel>
        <EuiFlexGroup gutterSize="l" wrap>
          {data.map((question) => (
            <EuiFlexItem key={question.id} style={{ minWidth: 300 }}>
              <EuiCard
                title={`Câu hỏi ${question.id}`}
                description={
                  <div>
                    <EuiText textAlign="left">
                      <strong>{question.content["content"]}</strong>
                    </EuiText>
                    {question.content["img"] && (
                      <EuiImage
                        size="m"
                        hasShadow
                        allowFullScreen
                        caption="Hình ảnh câu hỏi"
                        alt="Hình ảnh minh họa"
                        src={question.content["img"]}
                      />
                    )}
                    <ul style={{ listStyle: "square", textAlign: "left" }}>
                      {question.content["options"].map((o, index) => {
                        if (index === question.content["correct"] - 1) {
                          return (
                            <li key={index} style={{ textAlign: "left" }}>
                              <i style={{ color: "#ff0000" }}>{o}</i>
                            </li>
                          );
                        } else {
                          return (
                            <li key={index} style={{ textAlign: "left" }}>
                              {o}
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>
                }
                footer={
                  <div>
                    <EuiText textAlign="left" size="s">
                      <strong>Môn học:</strong> {question.subject_name}
                    </EuiText>

                    <EuiText textAlign="left" size="s">
                      <strong>{question.chapter_name}</strong>
                    </EuiText>
                    <EuiSpacer size="s" />
                    <EuiBasicTable items={[question]} columns={columns} />
                  </div>
                }
              />
            </EuiFlexItem>
          ))}
        </EuiFlexGroup>

        <EuiSpacer />
        <EuiFlexGroup justifyContent="spaceAround">
          <EuiFlexItem grow={false}>
            <EuiPagination
              pageCount={pageCount}
              activePage={page - 1}
              onPageClick={(p) => {
                setPage(p + 1);
              }}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
    </>
  );
};

export default Questions;
