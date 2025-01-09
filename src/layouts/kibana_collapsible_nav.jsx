import { useState } from 'react';
import {
  EuiCollapsibleNav,
  EuiCollapsibleNavGroup,
  EuiHeaderSectionItemButton,
  EuiHeader,
  EuiIcon,
  EuiFlexItem,
  EuiListGroup,
  useGeneratedHtmlId,
  EuiThemeProvider,
  EuiAvatar,
  EuiButton,
  EuiContextMenuItem,
  EuiPopover,
  EuiContextMenuPanel,
  EuiBadge,
  EuiText,
  EuiLoadingSpinner,
  EuiHorizontalRule,
} from '@elastic/eui';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../components/AppContext';
const CollapsibleNav = ({ pageTitle, loading }) => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [isPopoverOpen, setPopover] = useState(false);
  const { userProfile, logout, selectedCustomer, selectedBranch, setSelectedCustomer, setSelectedBranch } =
    useAppContext();
  const collapsibleNavId = useGeneratedHtmlId({ prefix: 'collapsibleNav' });
  const navigate = useNavigate();

  const collapsibleNav = (
    <EuiCollapsibleNav
      ownFocus={false}
      id={collapsibleNavId}
      aria-label="Main navigation"
      isOpen={navIsOpen}
      button={
        <EuiHeaderSectionItemButton aria-label="Toggle main navigation" onClick={() => setNavIsOpen(!navIsOpen)}>
          <EuiIcon type={'menu'} size="m" aria-hidden="true" />
        </EuiHeaderSectionItemButton>
      }
      onClose={() => setNavIsOpen(false)}
    >
      {userProfile.is_admin && (
        <EuiFlexItem grow={false} style={{ flexShrink: 0 }}>
          <EuiCollapsibleNavGroup isCollapsible={false} title="Quản lý khách hàng" background="light">
            <EuiThemeProvider colorMode="light">
              <EuiListGroup
                maxWidth="none"
                gutterSize="none"
                size="s"
                listItems={[
                  {
                    label: 'Khách hàng',
                    href: '/customers',
                    iconType: 'users',
                  },
                ]}
              />
              <EuiListGroup
                maxWidth="none"
                gutterSize="none"
                size="s"
                listItems={[
                  {
                    label: 'Chi nhánh',
                    href: '/branches',
                    iconType: 'users',
                  },
                ]}
              />
            </EuiThemeProvider>
          </EuiCollapsibleNavGroup>
        </EuiFlexItem>
      )}
      <EuiFlexItem grow={false} style={{ flexShrink: 0 }}>
        <EuiCollapsibleNavGroup isCollapsible={false} title="Câu hỏi và đề thi" background="light">
          <EuiThemeProvider colorMode="light">
            <EuiListGroup
              maxWidth="none"
              gutterSize="none"
              size="s"
              listItems={[
                {
                  label: 'Câu hỏi',
                  href: '/questions',
                  iconType: 'questionInCircle',
                  iconProps: {},
                },
              ]}
            />
          </EuiThemeProvider>
        </EuiCollapsibleNavGroup>
      </EuiFlexItem>
      <EuiFlexItem grow={false} style={{ flexShrink: 0 }}>
        <EuiCollapsibleNavGroup isCollapsible={false} background="light">
          <EuiThemeProvider colorMode="light">
            <EuiListGroup
              maxWidth="none"
              gutterSize="none"
              size="s"
              listItems={[
                {
                  label: 'Bộ đề',
                  href: '/qb',
                  iconType: 'sqlApp',
                  iconProps: {},
                },
              ]}
            />
          </EuiThemeProvider>
        </EuiCollapsibleNavGroup>
      </EuiFlexItem>
      <EuiFlexItem grow={false} style={{ flexShrink: 0 }}>
        <EuiCollapsibleNavGroup isCollapsible={false} background="light">
          <EuiThemeProvider colorMode="light">
            <EuiListGroup
              maxWidth="none"
              gutterSize="none"
              size="s"
              listItems={[
                {
                  label: 'Bài kiểm tra',
                  href: '/exam',
                  iconType: 'notebookApp',
                  iconProps: {},
                },
              ]}
            />
          </EuiThemeProvider>
        </EuiCollapsibleNavGroup>
      </EuiFlexItem>
      <EuiFlexItem grow={false} style={{ flexShrink: 0 }}>
        <EuiCollapsibleNavGroup isCollapsible={false} title="Quản lý thi/kiểm tra" background="light">
          <EuiThemeProvider colorMode="light">
            <EuiListGroup
              maxWidth="none"
              gutterSize="none"
              size="s"
              listItems={[
                {
                  label: 'Khoá học',
                  href: '/courses',
                  iconType: 'timelionApp',
                },
              ]}
            />
          </EuiThemeProvider>
        </EuiCollapsibleNavGroup>
      </EuiFlexItem>
      <EuiFlexItem grow={true} style={{ flexShrink: 0 }}>
        <EuiCollapsibleNavGroup background="light">
          <EuiThemeProvider colorMode="light">
            <EuiListGroup
              maxWidth="none"
              gutterSize="none"
              size="s"
              listItems={[
                {
                  label: 'Báo cáo',
                  href: '/reports',
                  iconType: 'reportingApp',
                },
              ]}
            />
          </EuiThemeProvider>
        </EuiCollapsibleNavGroup>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        {/* Span fakes the nav group into not being the first item and therefore adding a top border */}
        <span />
        <EuiCollapsibleNavGroup>
          <EuiButton fill fullWidth iconType="gear" disabled>
            Settings
          </EuiButton>
        </EuiCollapsibleNavGroup>
      </EuiFlexItem>
    </EuiCollapsibleNav>
  );

  const closePopover = () => {
    setPopover(false);
  };

  const onButtonLogoutClick = () => {
    setPopover(!isPopoverOpen);
  };

  const onLogout = () => {
    if (window.confirm('Bạn chắc chắn muốn thoát ra?')) {
      closePopover();
      logout();
      onClearSelection();
    } else {
      closePopover();
    }
  };

  const goHome = () => {
    navigate('/home');
  };

  const onClearSelection = () => {
    setSelectedCustomer(null);
    setSelectedBranch(null);
    closePopover();
  };

  const itemsLogout = [
    ...(userProfile.is_admin && (selectedCustomer || selectedBranch)
      ? [
          <EuiContextMenuItem key="clearSelection" icon="cross" onClick={onClearSelection}>
            Bỏ chọn khách hàng
          </EuiContextMenuItem>,
          <EuiContextMenuItem key="separator" disabled>
            <EuiHorizontalRule margin="none" />
          </EuiContextMenuItem>,
        ]
      : []),
    <EuiContextMenuItem key="logout" icon="exit" onClick={onLogout}>
      Đăng xuất
    </EuiContextMenuItem>,
  ];

  const buttonLogout = (
    <EuiHeaderSectionItemButton key={useGeneratedHtmlId()} aria-label="Account menu" onClick={onButtonLogoutClick}>
      <EuiAvatar type="space" name={userProfile.name} size="s" />
    </EuiHeaderSectionItemButton>
  );

  const leftSectionItems = [
    collapsibleNav,
    <EuiHeaderSectionItemButton key={useGeneratedHtmlId()} aria-label="Account menu" onClick={goHome}>
      <EuiIcon type="home" color="primary" />
    </EuiHeaderSectionItemButton>,
  ];
  if (loading) {
    leftSectionItems.push(<EuiLoadingSpinner size="m" />);
  }

  const title =
    pageTitle !== undefined
      ? [
          <EuiText>
            <h3>{pageTitle}</h3>
          </EuiText>,
        ]
      : [];

  const renderAdminInfo = () => {
    if (selectedBranch) {
      return (
        <EuiBadge>
          <EuiText size="xs" aria-label="Admin info">
            Chi nhánh: <strong>{selectedBranch.name}</strong>
          </EuiText>
        </EuiBadge>
      );
    }
    if (selectedCustomer) {
      return (
        <EuiBadge>
          <EuiText size="xs" aria-label="Admin info">
            Khách hàng: <strong>{selectedCustomer.name}</strong>
          </EuiText>
        </EuiBadge>
      );
    }
    return <EuiBadge>{userProfile.name}</EuiBadge>;
  };

  return (
    <>
      <EuiHeader
        position="fixed"
        sections={[
          {
            items: leftSectionItems,
            borders: 'right',
          },
          {
            items: title,
          },
          {
            items: [
              renderAdminInfo(),
              <EuiPopover
                id={useGeneratedHtmlId({ prefix: 'logoutMenu' })}
                button={buttonLogout}
                isOpen={isPopoverOpen}
                closePopover={closePopover}
                panelPaddingSize="none"
                anchorPosition="downLeft"
              >
                <EuiContextMenuPanel size="s" items={itemsLogout} />
              </EuiPopover>,
            ],
            borders: 'none',
          },
        ]}
      />
    </>
  );
};

export default CollapsibleNav;
