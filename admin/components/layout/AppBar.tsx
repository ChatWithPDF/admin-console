import * as React from "react";
import { AppBar, Logout, ToggleThemeButton, UserMenu } from "react-admin";
import {
    Typography,
} from "@mui/material";
import { darkTheme, lightTheme } from "./themes";

const CustomUserMenu = (props: any) => (
    <UserMenu {...props} >
        <Logout />
    </UserMenu >
);

const CustomAppBar = (props: any) => {
    return (
        <>
            <AppBar
                {...props}
                elevation={1}
                userMenu={<CustomUserMenu />}
            >
                <p>Samagra Bot Admin Panel</p>
                {/* <img id="samarth-logo" style={{ height: '3rem', padding: 5 }} src="https://himachal.nic.in/WriteReadData/l892s/16_l892s/samarth-logo-v9---lowres-22244626.png" /> */}
                <Typography sx={{ flex: 1 }} />
                <ToggleThemeButton
                    lightTheme={lightTheme}
                    darkTheme={darkTheme}
                />
            </AppBar>
            <style>
                {`
                    .RaUserMenu-avatar {
                        display: none !important;
                    }
                `}
            </style>
        </>
    );
};

export default CustomAppBar;
