export default (initialState: {
  currentUser?: any;
}) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://next.umijs.org/docs/max/access
  const admin = !!(
    initialState && initialState?.currentUser?.systemRole === "Admin"
  );

  const user = !!(
    initialState && initialState?.currentUser?.systemRole === "User"
  );

  const adminVaStaff = !!(
    initialState && initialState?.currentUser?.systemRole === "Admin" || initialState?.currentUser?.systemRole === "Staff"
  );

  return {
    admin,
    user,
    adminVaStaff
  };
};
