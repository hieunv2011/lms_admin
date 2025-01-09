import React, { useEffect, useState } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import {
    EuiButton,
    EuiButtonEmpty,
    EuiFieldText,
    EuiForm,
    EuiFormRow,
    EuiModal,
    EuiModalBody,
    EuiModalFooter,
    EuiModalHeader,
    EuiModalHeaderTitle,
    EuiSuperSelect,
    EuiText,
    useGeneratedHtmlId,
    EuiDatePicker,
    EuiFlexGroup,
    EuiFlexItem,
    EuiSpacer,
    EuiPanel,
    EuiSelectable,
    EuiBadge,
    EuiFieldNumber,
  } from '@elastic/eui';
import useApi from '../../utils/useApi';
import moment from 'moment';

export default NiceModal.create(({ exam }) => {
    const {updateCourseExam, createCourseExam, getQuestionBanks, getCourseExamQuestionBanks, updateCourseExamQuestionBanks} = useApi()
    const modal = useModal();

    const [editedExam, setExam] = useState({
      ...exam,
      start_date: moment(exam.start_date),
      end_date: moment(exam.end_date)
    });

    const onExamPropChange = (prop, value) => {
      setExam({...editedExam, [prop]: value});
    }

    const [questionBankOptions, setQuestionBankOptions] = useState([]);

    const modalTitleId = useGeneratedHtmlId();
    const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });

    const buildQuestionBanks = async () => {
      let linkMap = {};
      if (exam.id > 0) {
        const qbLinkResponse = await getCourseExamQuestionBanks(exam.id);
        qbLinkResponse.data.items.forEach(item => {
            linkMap[item.id] = item;
        });
      }

      const qbResponse = await getQuestionBanks("");
      const qbOptions = qbResponse.data.items.map(b => {
        return {
          id: b.id,
          label: b.name,
          append: <EuiBadge>{b.num_of_questions}</EuiBadge>,
          disabled: b.num_of_questions == 0,
          checked: linkMap[b.id] ? "on" : "undefined"
        }
      });
      setQuestionBankOptions(qbOptions);
    }

    const onSave = async () => {
      const qbItems = questionBankOptions.filter(b => b.checked == "on").map(b => b.id);
      if (exam.id == 0) {
          const response = await createCourseExam(editedExam);
          editedExam.id = response.data.id;
      } else {
          await updateCourseExam(exam.id, editedExam);
      }
      await updateCourseExamQuestionBanks(editedExam.id, qbItems);
      modal.resolve(editedExam);
      hideModal();
    }

    const hideModal = () => {
        modal.remove();
    }

    const examTypeSelectOptions = [
      {
        value: 0,
        inputDisplay: 'Đề cố định',
        dropdownDisplay: (
          <>
            <strong>Đề cố định</strong>
            <EuiText size="s" color="subdued">
              <p>Bài thi sẽ sử dụng tất cả các câu hỏi từ đề</p>
            </EuiText>
          </>
        ),
      },
      {
        value: 1,
        inputDisplay: 'Đề ngẫu nhiên',
        dropdownDisplay: (
          <>
            <strong>Đề ngẫu nhiên</strong>
            <EuiText size="s" color="subdued">
              <p>Bài kiểm tra sẽ lấy ngẫu nhiên 1 số câu hỏi</p>
            </EuiText>
          </>
        ),
      }
    ];

    useEffect(() => {
      buildQuestionBanks();
    }, []);
    
    const isFormValid = () => {
      let qbSelected = false;
      for (let i = 0; i < questionBankOptions.length; i++) {
        if (questionBankOptions[i].checked == "on") {
          qbSelected = true;
          break;
        }
      }
      return (qbSelected && editedExam.name != "" && editedExam.start_date <= editedExam.end_date && editedExam.num_of_questions >0 && editedExam.passing_score > 0 && editedExam.passing_score <= editedExam.num_of_questions && editedExam.duration > 0);
    }

    return (
      <EuiModal
          aria-labelledby={modalTitleId}
          onClose={hideModal}
          initialFocus="[name=popswitch]"
          style={{width: 800, height: 600}}
        >
          <EuiModalHeader>
            <EuiModalHeaderTitle id={modalTitleId}>
              Bài kiểm tra
            </EuiModalHeaderTitle>
          </EuiModalHeader>

          <EuiModalBody>
            <EuiFlexGroup gutterSize="l">
              <EuiFlexItem>
                <EuiPanel>
                  <EuiForm id={modalFormId}>
                    <EuiFormRow label="Tên bài kiểm tra">
                      <EuiFieldText name="name" value={editedExam.name} onChange={(e) => onExamPropChange("name", e.target.value)} />
                    </EuiFormRow>
                
                    <EuiFormRow label="Loại đề">
                      <EuiSuperSelect
                          options={examTypeSelectOptions}
                          valueOfSelected={editedExam.type}
                          onChange={(value) => onExamPropChange("type", value)}
                          itemLayoutAlign="top"
                          hasDividers
                      />
                    </EuiFormRow>
                    <EuiSpacer/>
                    <EuiFlexGroup>
                      <EuiFlexItem>
                        <EuiFormRow label="Ngày bắt đầu">
                          <EuiDatePicker selected={editedExam.start_date} dateFormat="DD/MM/YYYY" onChange={(d) => onExamPropChange("start_date", d)}/>
                        </EuiFormRow>
                      </EuiFlexItem>
                      <EuiFlexItem>
                        <EuiFormRow label="Ngày kết thúc">
                          <EuiDatePicker selected={editedExam.end_date} dateFormat="DD/MM/YYYY" onChange={(d) => onExamPropChange("end_date", d)} />
                        </EuiFormRow>
                      </EuiFlexItem>
                    </EuiFlexGroup>
                    <EuiSpacer/>
                    <EuiFlexGroup>
                      <EuiFlexItem>
                        <EuiFormRow label="Số câu hỏi">
                          <EuiFieldNumber value={editedExam.num_of_questions} onChange={(e) => onExamPropChange("num_of_questions", parseInt(e.target.value))} disabled={editedExam.type == 0} />
                        </EuiFormRow>
                      </EuiFlexItem>
                      <EuiFlexItem>
                        <EuiFormRow label="Điểm đạt">
                          <EuiFieldNumber value={editedExam.passing_score} onChange={(e) => onExamPropChange("passing_score", parseInt(e.target.value))}/>
                        </EuiFormRow>
                      </EuiFlexItem>
                      <EuiFlexItem>
                        <EuiFormRow label="Thời gian">
                          <EuiFieldNumber value={editedExam.duration} onChange={(e) => onExamPropChange("duration", parseInt(e.target.value))}/>
                        </EuiFormRow>
                      </EuiFlexItem>
                    </EuiFlexGroup>
                  </EuiForm>
                </EuiPanel>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiPanel style={{height: 420}}>
                  <EuiSelectable
                    searchable
                    aria-label="question bank list"
                    options={questionBankOptions}
                    listProps={{ bordered: true }}
                    onChange={(newOptions) => {setQuestionBankOptions(newOptions)}}
                    height="full"
                    searchProps={{placeholder: "Tìm bộ đề"}}
                  >
                          {(list, search) => (
                            <>
                              {search}
                              {list}
                            </>
                          )}
                  </EuiSelectable>
                </EuiPanel>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiModalBody>

          <EuiModalFooter>
            <EuiButton
              type="button"
              onClick={onSave}
              fill
              disabled={!isFormValid()}
            >
              Ghi
            </EuiButton>
            <EuiButtonEmpty onClick={hideModal}>Đóng</EuiButtonEmpty>
          </EuiModalFooter>
        </EuiModal>
    );
  });