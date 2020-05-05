import styles from "./index.scss";

import React, { useEffect, useState } from "react";
import { Response } from "../../api/interfaces";
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
import { authStore } from '../../stores/AuthStore';
import { DashboardDTO } from '../../api/models/DashboardDTO';
import { dashboardApi } from '../../api/clients/DashboardAPI';

const _NavigationBar: React.FC<PropsBase> = ({ className }) => {
    const isStoreOpen = useBehavior(mainStore.isStoreOpen);
    const dashboard = useBehavior(dashboardStore.currentDashboard);
    const { isLocked } = useBehavior(dashboard.state);
    const currentUser = useBehavior(authStore.user);
    const [isLockEnabled, setLockEnabled] = useState(false);

    useEffect(() => {
        isUserDashboardOwner().then((response: boolean) => {
            setLockEnabled(response);
        });    
    });

    const isUserDashboardOwner = async (): Promise<boolean> =>  {
        const dashboardId = dashboard.state().value.id;
        if (!dashboardId)
            return false;

        const response: Response<DashboardDTO> = await dashboardApi.getDashboard(dashboardId)
        const stack =  response.data.stack;
    
        if (stack && stack.owner && currentUser)
        {
            return currentUser.isAdmin || currentUser.username == stack.owner.username;
        }
        else
        {
            return false;
        }
    }

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
                <LockButton dashboard={dashboard} isLocked={isLocked} isStoreOpen={isStoreOpen} isLockEnabled={isLockEnabled} />
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
