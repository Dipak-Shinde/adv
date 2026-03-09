import * as SideMenuModel from "../models/sidemenuModel.js";

export async function getSideMenuService() {

  const result = await SideMenuModel.getSideMenu();

  return {
    success: true,
    data: result.rows[0]?.sidemenu || []
  };
}