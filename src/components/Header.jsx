import React, { useState } from "react";
import {
  EuiAvatar,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiHeaderBreadcrumbs,
  EuiHeaderLogo,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
  EuiLink,
  EuiPopover,
  EuiPopoverFooter,
  EuiPopoverTitle,
  EuiSelectable,
  EuiSelectableMessage,
  EuiSelectableTemplateSitewide,
  EuiSpacer,
  EuiText,
  EuiButtonIcon,
  useGeneratedHtmlId,
} from "@elastic/eui";
import { Link } from "react-router-dom";

const Header = ({ toggleSide }) => {
  const renderLogo = () => (
    <>
      <EuiHeaderLogo
        iconType="logoElastic"
        href="#"
        onClick={(e) => e.preventDefault()}
        aria-label="Go to home page"
      />
      <EuiButtonIcon
        iconType="menu"
        aria-label="Menu"
        size="m"
        color="black"
        onClick={toggleSide}
      />
    </>
  );

  const renderBreadcrumbs = () => {
    const breadcrumbs = [
      {
        text: "Management",
        href: "#",
        onClick: (e) => e.preventDefault(),
        "data-test-subj": "breadcrumbsAnimals",
        className: "customClass",
      },
      {
        text: "Truncation test is here for a really long item",
        href: "#",
        onClick: (e) => e.preventDefault(),
      },
      {
        text: "Hidden",
        href: "#",
        onClick: (e) => e.preventDefault(),
      },
      {
        text: "Users",
        href: "#",
        onClick: (e) => e.preventDefault(),
      },
      {
        text: "Create",
      },
    ];
    return (
      <EuiHeaderBreadcrumbs
        aria-label="Header breadcrumbs example"
        breadcrumbs={breadcrumbs}
      />
    );
  };

  const search = (
    <EuiSelectableTemplateSitewide
      options={[]}
      searchProps={{
        compressed: true,
      }}
      popoverButton={
        <EuiHeaderSectionItemButton aria-label="Sitewide search">
          <EuiIcon type="search" size="m" />
        </EuiHeaderSectionItemButton>
      }
      emptyMessage={
        <EuiSelectableMessage style={{ minHeight: 300 }}>
          <p>
            Please see the component page for{" "}
            <Link to="/forms/selectable">
              <strong>EuiSelectableTemplateSitewide</strong>
            </Link>{" "}
            on how to configure your sitewide search.
          </p>
        </EuiSelectableMessage>
      }
    />
  );

  return (
    <EuiHeader style={{ width: "100%" }}>
      <EuiHeaderSection>
        <EuiHeaderSectionItem>{renderLogo()}</EuiHeaderSectionItem>
        <EuiHeaderSectionItem>
          <HeaderSpacesMenu />
        </EuiHeaderSectionItem>
      </EuiHeaderSection>
      {/* {renderBreadcrumbs()} */}
      <EuiHeaderSection side="right">
        <EuiHeaderSectionItem>{search}</EuiHeaderSectionItem>
        <EuiHeaderSectionItem>
          <HeaderUserMenu />
        </EuiHeaderSectionItem>
        <EuiHeaderSectionItem>
          <HeaderAppMenu />
        </EuiHeaderSectionItem>
      </EuiHeaderSection>
    </EuiHeader>
  );
};

const HeaderUserMenu = () => {
  const headerUserPopoverId = useGeneratedHtmlId({
    prefix: "headerUserPopover",
  });
  const [isOpen, setIsOpen] = useState(false);

  const onMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const button = (
    <EuiHeaderSectionItemButton
      aria-controls={headerUserPopoverId}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Account menu"
      onClick={onMenuButtonClick}
    >
      <EuiAvatar name="John Username" size="s" />
    </EuiHeaderSectionItemButton>
  );

  return (
    <EuiPopover
      id={headerUserPopoverId}
      button={button}
      isOpen={isOpen}
      anchorPosition="downRight"
      closePopover={closeMenu}
      panelPaddingSize="m"
    >
      <div style={{ width: 300 }}>
        <EuiFlexGroup gutterSize="m" responsive={false}>
          <EuiFlexItem grow={false}>
            <EuiAvatar name="John Username" size="xl" />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiText>
              <p>John Username</p>
            </EuiText>
            <EuiSpacer size="m" />
            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiFlexGroup justifyContent="spaceBetween">
                  <EuiFlexItem grow={false}>
                    <EuiLink>Edit profile</EuiLink>
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiLink>Log out</EuiLink>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </EuiPopover>
  );
};

const HeaderSpacesMenu = () => {
  const headerSpacesPopoverId = useGeneratedHtmlId({
    prefix: "headerSpacesPopover",
  });
  const spacesValues = [
    {
      label: "Sales team",
      prepend: <EuiAvatar type="space" name="Sales Team" size="s" />,
      checked: "on",
    },
    {
      label: "Engineering",
      prepend: <EuiAvatar type="space" name="Engineering" size="s" />,
    },
    {
      label: "Security",
      prepend: <EuiAvatar type="space" name="Security" size="s" />,
    },
    {
      label: "Default",
      prepend: <EuiAvatar type="space" name="Default" size="s" />,
    },
  ];
  const additionalSpaces = [
    {
      label: "Sales team 2",
      prepend: <EuiAvatar type="space" name="Sales Team 2" size="s" />,
    },
    {
      label: "Engineering 2",
      prepend: <EuiAvatar type="space" name="Engineering 2" size="s" />,
    },
    {
      label: "Security 2",
      prepend: <EuiAvatar type="space" name="Security 2" size="s" />,
    },
    {
      label: "Default 2",
      prepend: <EuiAvatar type="space" name="Default 2" size="s" />,
    },
  ];

  const [spaces, setSpaces] = useState(spacesValues);
  const [selectedSpace, setSelectedSpace] = useState(
    spaces.filter((option) => option.checked)[0]
  );
  const [isOpen, setIsOpen] = useState(false);

  const isListExtended = () => {
    return spaces.length > 4 ? true : false;
  };

  const onMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const closePopover = () => {
    setIsOpen(false);
  };

  const onChange = (options) => {
    setSpaces(options);
    setSelectedSpace(options.filter((option) => option.checked)[0]);
    setIsOpen(false);
  };

  const addMoreSpaces = () => {
    setSpaces(spaces.concat(additionalSpaces));
  };

  const button = (
    <EuiHeaderSectionItemButton
      aria-controls={headerSpacesPopoverId}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Spaces menu"
      onClick={onMenuButtonClick}
    >
      {selectedSpace.prepend}
    </EuiHeaderSectionItemButton>
  );

  return (
    <EuiPopover
      id={headerSpacesPopoverId}
      button={button}
      isOpen={isOpen}
      anchorPosition="downLeft"
      closePopover={closePopover}
      panelPaddingSize="none"
    >
      <EuiSelectable
        {...{
          searchable: isListExtended(),
          searchProps: {
            placeholder: "Find a space",
            compressed: true,
          },
        }}
        options={spaces}
        singleSelection="always"
        style={{ width: 300 }}
        onChange={onChange}
        listProps={{
          rowHeight: 40,
          showIcons: false,
        }}
      >
        {(list, search) => (
          <>
            <EuiPopoverTitle paddingSize="s">
              {search || "Your spaces"}
            </EuiPopoverTitle>
            {list}
            <EuiPopoverFooter paddingSize="s">
              <EuiButton
                size="s"
                fullWidth
                onClick={addMoreSpaces}
                disabled={isListExtended()}
              >
                Add more spaces
              </EuiButton>
            </EuiPopoverFooter>
          </>
        )}
      </EuiSelectable>
    </EuiPopover>
  );
};

const HeaderAppMenu = () => {
  const headerAppMenuPopoverId = useGeneratedHtmlId({
    prefix: "headerAppMenuPopover",
  });
  const [isOpen, setIsOpen] = useState(false);

  const onMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const button = (
    <EuiHeaderSectionItemButton
      aria-controls={headerAppMenuPopoverId}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="App menu"
      onClick={onMenuButtonClick}
    >
      <EuiIcon type="apps" size="m" />
    </EuiHeaderSectionItemButton>
  );

  return (
    <EuiPopover
      id={headerAppMenuPopoverId}
      button={button}
      isOpen={isOpen}
      anchorPosition="downRight"
      closePopover={closeMenu}
      panelPaddingSize="m"
    >
      {/* <EuiKeyPadMenu>
        <EuiKeyPadMenuItem label="App 1" iconType="apps" />
        <EuiKeyPadMenuItem label="App 2" iconType="apps" />
        <EuiKeyPadMenuItem label="App 3" iconType="apps" />
        <EuiKeyPadMenuItem label="App 4" iconType="apps" />
      </EuiKeyPadMenu> */}
    </EuiPopover>
  );
};

export default Header;
