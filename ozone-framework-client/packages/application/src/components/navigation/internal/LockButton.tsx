import React from "react";

import { useBehavior } from "../../../hooks";
import { AnchorButton } from "@blueprintjs/core";

import { dashboardStore } from "../../../stores/DashboardStore";
import { mainStore } from "../../../stores/MainStore";

import { Dashboard } from "../../../models/Dashboard";
import { NavbarTooltip } from "./NavbarTooltip";

export interface LockButtonProps {
    dashboard: Dashboard;
    isStoreOpen: boolean;
    isLocked: boolean;
    isLockEnabled: boolean;
}

const _LockButton: React.FC<LockButtonProps> = ({ dashboard, isLocked, isStoreOpen, isLockEnabled }) => {
    const tooltipProps = {
        title: isLocked ? "Unlock Dashboard" : "Lock Dashboard",
        description: isLockEnabled ? 
            (isLocked ? 
                "Unlock the current Dashboard to allow modifications" : 
                "Lock the current Dashboard to prevent modifications"
            ) : 
            "Disabled due to user preference setting"
    };

    const buttonProps = {
        icon: isLocked ? "lock" : "unlock",
        onClick: isLocked ? dashboard.unlock : dashboard.lock,
        disabled: isStoreOpen || !isLockEnabled
    } as const;

    return (
        <NavbarTooltip {...tooltipProps}>
            <AnchorButton minimal {...buttonProps} />
        </NavbarTooltip>
    );
};

export const LockButton = React.memo(_LockButton);
