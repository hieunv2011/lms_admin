import React from "react";
import {
  EuiCode,
  EuiSteps,
  EuiText,
  EuiCodeBlock,
  EuiSubSteps,
  EuiSpacer,
  EuiButtonEmpty,
  EuiCommentList,
  EuiCommentProps,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiBadge,
  EuiIcon,
  EuiDescriptionList,
  EuiPanel,
  EuiButton
} from "@elastic/eui";

const body = (
  <EuiText size="s">
    <p>
      Far out in the uncharted backwaters of the unfashionable end of the
      western spiral arm of the Galaxy lies a small unregarded yellow sun.
    </p>
  </EuiText>
);

const copyAction = (
  <EuiButtonIcon
    title="Custom action"
    aria-label="Custom action"
    color="text"
    iconType="copy"
  />
);

const complexEvent = (
  <EuiFlexGroup responsive={false} alignItems="center" gutterSize="xs" wrap>
    <EuiFlexItem grow={false}>added tags</EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiBadge>case</EuiBadge>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiBadge>phishing</EuiBadge>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiBadge>security</EuiBadge>
    </EuiFlexItem>
  </EuiFlexGroup>
);

const comments = [
  {
    username: "janed",
    timelineAvatarAriaLabel: "Jane Doe",
    event: "added a comment",
    timestamp: "on Jan 1, 2020",
    children: body,
    actions: copyAction,
  },
  {
    username: "juanab",
    timelineAvatarAriaLabel: "Juana Barros",
    actions: copyAction,
    event: "pushed incident X0Z235",
    timestamp: "on Jan 3, 2020",
  },
  {
    username: "pancho1",
    timelineAvatarAriaLabel: "Pancho Pérez",
    event: "edited case",
    timestamp: "on Jan 9, 2020",
    eventIcon: "pencil",
    eventIconAriaLabel: "edit",
  },
  {
    username: "pedror",
    timelineAvatarAriaLabel: "Pedro Rodriguez",
    actions: copyAction,
    event: complexEvent,
    timestamp: "on Jan 11, 2020",
    eventIcon: "tag",
    eventIconAriaLabel: "tag",
  },
  {
    username: "Assistant",
    timelineAvatarAriaLabel: "Assistant",
    timestamp: "on Jan 14, 2020, 1:39:04 PM",
    children: <p>An error occurred sending your message.</p>,
    actions: copyAction,
    eventColor: "danger",
  },
];
const favoriteVideoGame = [
  {
    title: "Số câu hỏi: ",
    description: "10",
  },
  {
    title: "Danh sách bộ đề: ",
    description: "Open-world, fantasy, action role-playing",
  },
];
const steps = [
  {
    title: (
      <div className="">
        <h1>Chương I: Hướng dẫn sử dụng LMS</h1>
        <EuiButtonEmpty iconType="clock">300 phút</EuiButtonEmpty>
      </div>
    ),
    children: (
      <>
        <EuiText>
          <h3 className="flex items-center space-x-2">
            <EuiIcon type="notebookApp" size="l" />
            <strong>Phần I: Những nội dung cơ bản của luật GTĐB</strong>
            <EuiButtonEmpty iconType="clock">120 phút</EuiButtonEmpty>
          </h3>
          <p>
            Thông báo: Giữa tháng 9, hội nghị Trung ương 10 khóa 13 thống nhất
            chủ trương đầu tư toàn tuyến dự án đường sắt tốc độ cao (350 km/h)
            trên trục Bắc Nam. Theo đề xuất của Bộ Giao thông Vận tải, dự án
            đường sắt tốc độ cao Bắc Nam có tổng mức đầu tư sơ bộ hơn 1,7 triệu
            tỷ đồng (tương đương 67,34 tỷ USD), tuyến đường đôi, khổ 1.435 mm.
            Tại thông báo hôm nay, Hội đồng thẩm định Nhà nước đề nghị Bộ Giao
            thông Vận tải rà soát tổng mức đầu tư, quy mô đầu tư từng hạng mục
            trên cơ sở tính đúng, đủ và phù
          </p>
        </EuiText>
        <EuiSpacer />
        <EuiText>
          <h3 className="flex items-center space-x-2">
            <EuiIcon type="notebookApp" size="l" />
            <strong>Phần 3: Thực hành</strong>
            <EuiButtonEmpty iconType="clock">60 phút</EuiButtonEmpty>
          </h3>
        </EuiText>
        <EuiDescriptionList
          listItems={favoriteVideoGame}
          type="column"
          columnWidths={[5, 10]}
          style={{ maxInlineSize: "400px" }}
        />
        <EuiSpacer />
        <EuiText>
          <h3 className="flex items-center space-x-2">
            <EuiIcon type="notebookApp" size="l" />
            <strong>Trực tuyến</strong>
            <EuiButtonEmpty iconType="clock">60 phút</EuiButtonEmpty>
          </h3>
        </EuiText>
        <EuiFlexGroup>
          <EuiFlexItem grow={1}>
            <EuiBadge iconType="discuss" color="primary">
              Google Meet
            </EuiBadge>
          </EuiFlexItem>
          <EuiFlexItem grow={9}>
            <EuiText>Thời gian: 30/09/2024 11:30 - 09/10/2024 17:00</EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer />
        <EuiButton fullWidth iconType="addDataApp" onClick={() => {}}>
          Thêm bài học
        </EuiButton>
        {/* <EuiCommentList comments={comments} aria-label="Comment list example" /> */}
      </>
    ),
  },
  {
    title: "Chương 2",
    children: (
      <>
        <EuiText>
          <h3 className="flex items-center space-x-2">
            <EuiIcon type="notebookApp" size="l" />
            <strong>Tiêu đề</strong>
          </h3>
        </EuiText>
        <EuiButtonEmpty iconType="listAdd">Thêm chi tiết</EuiButtonEmpty>
        <EuiSpacer />
        <EuiText>
          <h3 className="flex items-center space-x-2">
            <EuiIcon type="notebookApp" size="l" />
            <strong>Phần 2: Video</strong>
          </h3>
        </EuiText>
        <EuiSpacer />
        <EuiPanel>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/Mw2ZAxkAYfw"
            title="Video bài học"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </EuiPanel>
      </>
    ),
  },
  {
    title: "Step 3 has an intro and one line instruction",
    children: (
      <EuiText>
        <p>
          Now that you&apos;ve completed step 2, go find the{" "}
          <EuiCode>thing</EuiCode>.
        </p>
        <p>
          Go to <strong>Overview &gt;&gt; Endpoints</strong> note{" "}
          <strong>Elasticsearch</strong> as <EuiCode>&lt;thing&gt;</EuiCode>.
        </p>
      </EuiText>
    ),
  },
  {
    title: "The last step has two options",
    children: (
      <EuiText size="s">
        <h3>
          <strong>Option 1:</strong> If you have this type of instance
        </h3>
        <EuiSubSteps>
          <ol>
            <li>Do thing 1</li>
            <li>Do thing 2</li>
            <li>Do thing 3</li>
          </ol>
        </EuiSubSteps>
        <h3>
          <strong>Option 2:</strong> If you have the other type of instance
        </h3>
        <EuiSubSteps>
          <ol>
            <li>Do thing 1</li>
            <li>Do thing 2</li>
            <li>Do thing 3</li>
          </ol>
        </EuiSubSteps>
      </EuiText>
    ),
  },
];

const Test = () => (
  <div>
    <EuiSteps headingElement="h2" steps={steps} />
  </div>
);

export default Test;
