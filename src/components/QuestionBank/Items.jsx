import React, { useState, useEffect } from "react";
import { EuiBasicTable, EuiButton, EuiImage, EuiText } from "@elastic/eui";
import KibanaLayout from "../../layouts/kibana";
import useApi from "../../utils/useApi";
import { useParams } from "react-router-dom";
import NiceModal from "@ebay/nice-modal-react";

const QuestionBankItems = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [info, setInfo] = useState({ name: "", is_owner: false });
  const { getQuestionBankItems, getQuestionBank, removeQuestionBankItems } =
    useApi();

  const columns = [
    {
      field: "id",
      name: "ID",
      valign: "top",
      width: "50px",
    },
    {
      field: "content",
      name: "Câu hỏi",
      valign: "top",
      render: (content) => {
        return (
          <div>
            <p>
              <strong>{content["content"]}</strong>
            </p>
            {content["img"] && (
              <EuiImage
                size="m"
                hasShadow
                allowFullScreen
                caption=""
                alt=""
                src={content["img"]}
              />
            )}
            <ol style={{ listStyle: "square" }}>
              {content["options"].map((o, index) => {
                if (index == content["correct"] - 1) {
                  return (
                    <li key={index}>
                      <i style={{ color: "#ff0000" }}>{o}</i>
                    </li>
                  );
                } else {
                  return <li key={index}>{o}</li>;
                }
              })}
            </ol>
          </div>
        );
      },
    },
    {
      field: "subject_name",
      name: "Môn học",
      valign: "top",
      width: "200px",
    },
    {
      field: "chapter_name",
      name: "Chương",
      valign: "top",
      width: "200px",
    },
    {
      name: "Actions",
      actions: [
        {
          name: "Delete",
          description: "Xoá",
          icon: "trash",
          type: "icon",
          color: "danger",
          enabled: () => info.is_owner,
          onClick: async (q) => {
            if (window.confirm("Bạn chắc chắn muốn bỏ câu này khỏi bộ đề")) {
              await removeQuestionBankItems(id, q.id);
              fetchData();
            }
          },
        },
      ],
    },
  ];

  const addQuestionBankItem = () => {
    NiceModal.show("select-questions", { bankId: id }).then(() => {
      fetchData();
    });
  };

  const fetchData = async () => {
    const response = await getQuestionBankItems(id);
    setData(response.data.items);
  };

  const getQuestionBankInfo = async () => {
    const response = await getQuestionBank(id);
    setInfo(response.data);
  };

  useEffect(() => {
    getQuestionBankInfo();
    fetchData();
  }, []);

  return (
    // <KibanaLayout
    //   pageHeader={{
    //     pageTitle: `Danh sách câu hỏi: ${info.name}`,
    //     rightSideItems: [
    //       <EuiButton fill onClick={addQuestionBankItem} disabled={!info.is_owner}>
    //         Thêm câu hỏi
    //       </EuiButton>,
    //     ],
    //     pageTitleProps: { className: 'pageTitle' },
    //   }}
    // >
    <>
      <EuiText>
        <h3>
          <strong>Danh sách câu hỏi: {info.name}</strong>
        </h3>
      </EuiText>
      <EuiBasicTable
        tableCaption="Danh sách câu hỏi"
        items={data}
        itemId="id"
        columns={columns}
        tableLayout="auto"
      />
    </>
    // </KibanaLayout>
  );
};

export default QuestionBankItems;
