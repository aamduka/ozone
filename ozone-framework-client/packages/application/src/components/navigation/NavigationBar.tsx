import styles from "./index.scss";

import React, { useState, useEffect } from "react";
import { useBehavior } from "../../hooks";

import { mainStore } from "../../stores/MainStore";

import { Alignment, Navbar, NavbarDivider, NavbarGroup, NavbarHeading } from "@blueprintjs/core";

import { PropsBase } from "../../common";

import { classNames } from "../../utility";
import { dashboardStore } from "../../stores/DashboardStore";

import {
    AddLayoutButton,
    DesktopButton,
    HelpButton,
    LockButton,
    SaveDashboardButton,
    StacksButton,
    StoreButton,
    ThemeButton,
    UserMenuButton,
    WidgetsButton
} from "./internal";
import { UserPreferenceAPI, userPreferenceApi } from '../../api/clients/PreferenceUserAPI';
import { authStore } from '../../stores/AuthStore';

const _NavigationBar: React.FC<PropsBase> = ({ className }) => {
    const isStoreOpen = useBehavior(mainStore.isStoreOpen);
    const dashboard = useBehavior(dashboardStore.currentDashboard);
    const { isLocked } = useBehavior(dashboard.state);
    const currentUser = useBehavior(authStore.user);
    const [isLockEnabled, setLockEnabled] = useState(false);
    const dashboardLockPrefPath = "dashboard.lock";

    useEffect(() => {
        getDashboardLockPreference().then((response: boolean) => {
            setLockEnabled(response);
        });    
    });

    const getDashboardLockPreference = async () =>  {

        if (!currentUser) return false;
        else if (currentUser.isAdmin) return true;

        const response = await userPreferenceApi.getPreference("dashboard", "dashboard.lockEnabled");
        const lockEnabled = response.data.data;
        return lockEnabled.length > 0 && lockEnabled[0].value === 'true';
    };

    return (
        <Navbar className={classNames(styles.navbar, className)}>
            <NavbarGroup className={styles.group} align={Alignment.LEFT}>
                <StoreButton />
                <DesktopButton />

                <StacksButton />
                <WidgetsButton isLocked={isLocked} isStoreOpen={isStoreOpen} />
            </NavbarGroup>

            <NavbarGroup className={styles.group} align={Alignment.CENTER}>
                <NavbarHeading>OZONE Widget Framework</NavbarHeading>
            </NavbarGroup>

            <NavbarGroup className={styles.group} align={Alignment.RIGHT}>
                <LockButton dashboard={dashboard} isLocked={isLocked} isStoreOpen={isStoreOpen} isLockEnabled={isLockEnabled}  />
                <SaveDashboardButton isStoreOpen={isStoreOpen} />
                <AddLayoutButton isLocked={isLocked} isStoreOpen={isStoreOpen} />
                <NavbarDivider />
                <ThemeButton />
                <HelpButton />
                <UserMenuButton />
            </NavbarGroup>
        </Navbar>
    );
};

export const NavigationBar = React.memo(_NavigationBar);
