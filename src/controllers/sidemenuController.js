import * as SideMenuService from "../services/sidemenuService.js";
export async function getSideMenu(req, res) {
  try {

    const result = await SideMenuService.getSideMenuService();

    res.json({
      success: true,
      sidemenu: result.data
    });

  } catch (err) {
    console.error("SideMenu API Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}