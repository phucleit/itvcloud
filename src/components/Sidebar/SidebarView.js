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
  Laptop as LaptopIcon,
  Settings as SettingsIcon,
  Backup as BackupIcon,
  ListAlt as ListAltIcon
} from "@material-ui/icons";
import classNames from 'classnames';

import SidebarLink from './components/SidebarLink/SidebarLinkContainer';

const structure = [
  { id: 0, label: "Trang chủ", link: "/app/dashboard", icon: <HomeIcon /> },
  {
    id: 1,
    label: "Tài khoản",
    link: "/app/tai-khoan",
    icon: <PersonAddIcon />,
    children: [
      { label: "Danh sách tài khoản", link: "/app/tai-khoan" },
      { label: "Thêm tài khoản", link: "/app/them-tai-khoan" },
      { label: "Nhóm người dùng", link: "/app/roles" },
      { label: "Thêm nhóm người dùng", link: "/app/new-role" },
    ],
  },
  {
    id: 2,
    label: "Quản lý khách laptop",
    link: "/app/khach-laptop",
    icon: <LaptopIcon />,
    children: [
      { label: "Danh sách", link: "/app/khach-laptop" },
      { label: "Thêm mới", link: "/app/them-khach-laptop" },
    ],
  },
  {
    id: 3,
    label: "Quản lý khách website",
    link: "/app/khach-website",
    icon: <WebIcon />,
    children: [
      { label: "Danh sách", link: "/app/khach-website" },
      { label: "Thêm mới", link: "/app/them-khach-website" },
    ],
  },
  {
    id: 4,
    label: "Dịch vụ",
    link: "/app/dich-vu",
    icon: <SettingsIcon />,
    children: [
      { label: "Danh sách", link: "/app/dich-vu" },
      { label: "Thêm mới", link: "/app/them-dich-vu" },
    ],
  },
  { id: 5, label: "Tạo báo cáo", link: "", icon: <ListAltIcon /> },
  { id: 6, label: "Cấu hình hệ thống", link: "", icon: <BackupIcon /> },
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
