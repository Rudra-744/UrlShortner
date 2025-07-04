import { createRootRoute } from "@tanstack/react-router"
import { authRoute } from "./auth.route"
import { dashboardRoute } from "./dashboard"
import { homePageRoute } from "./homePage"
import RootLayout from "../RootLayout"


export const rootRoute = createRootRoute({
    component: RootLayout
})
export const routeTree = rootRoute.addChildren([
    homePageRoute,
    authRoute,
    dashboardRoute        
])  