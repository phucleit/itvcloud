import React from 'react';
import {
  Drawer,
  IconButton,
  List,
  withStyles } from "@material-ui/core";
import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
  Person as PersonAddIcon,
  Settings as SettingsIcon,
  Backup as BackupIcon,
  Apps as AppsIcon,
  ListAlt as ListAltIcon
} from "@material-ui/icons";
import classNames from 'classnames';

import SidebarLink from './components/SidebarLink/SidebarLinkContainer';

const structure = [
  { id: 0, label: "Trang chủ", link: "/app/dashboard", icon: <HomeIcon /> },
  {
    id: 1,
    label: "Tài khoản",
    link: "/app/users",
    icon: <PersonAddIcon />,
    children: [
      { label: "Danh sách tài khoản", link: "/app/users" },
      { label: "Thêm tài khoản", link: "/app/new-user" },
      { label: "Nhóm người dùng", link: "/app/roles" },
      { label: "Thêm nhóm người dùng", link: "/app/new-role" },
    ],
  },
  {
    id: 2,
    label: "Quản lý dịch vụ",
    link: "/app/services",
    icon: <SettingsIcon />,
    children: [
      { label: "Danh sách dịch vụ", link: "/app/services" },
      { label: "Thêm dịch vụ mới", link: "/app/new-service" },
    ],
  },
  {
    id: 3,
    label: "Quản lý công trình",
    link: "/app/constructions",
    icon: <AppsIcon />,
    children: [
      { label: "Danh sách công trình", link: "/app/constructions" },
      { label: "Thêm công trình mới", link: "/app/new-construction" },
    ],
  },
  { id: 4, label: "Tạo báo cáo", link: "", icon: <ListAltIcon /> },
  { id: 5, label: "Cấu hình hệ thống", link: "", icon: <BackupIcon /> },
];

const SidebarView = ({ classes, theme, toggleSidebar, isSidebarOpened, isPermanent, location }) => {
  return (
    <Drawer
      variant={isPermanent ? 'permanent' : 'temporary'}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames(classes.drawer, {
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.mobileBackButton}>
        <IconButton
          onClick={toggleSidebar}
        >
          <ArrowBackIcon classes={{ root: classNames(classes.headerIcon, classes.headerIconCollapse) }} />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => <SidebarLink key={link.id} location={location} isSidebarOpened={isSidebarOpened} {...link} />)}
      </List>
    </Drawer>
  );
}

const drawerWidth = 360;

const styles = theme => ({
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    top: theme.spacing.unit * 8,
    [theme.breakpoints.down("sm")]: {
      top: 0,
    }
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 40,
    [theme.breakpoints.down("sm")]: {
      width: drawerWidth,
    }
  },
  toolbar: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("sm")]: {
      display: 'none',
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  mobileBackButton: {
    marginTop: theme.spacing.unit * .5,
    marginLeft: theme.spacing.unit * 3,
    [theme.breakpoints.only("sm")]: {
      marginTop: theme.spacing.unit * .625,
    },
    [theme.breakpoints.up("md")]: {
      display: 'none',
    }
  }
});

export default withStyles(styles, { withTheme: true })(SidebarView);
