import "./NavigationBar.scss";

import * as React from "react";
import { observer } from "mobx-react";

import { Alignment, Button, Navbar, NavbarGroup, NavbarHeading, Popover, Position } from "@blueprintjs/core";

import { inject } from "../../inject";
import { ConfigStore, MainStore } from "../../stores";

import { NavbarTooltip } from "./NavbarTooltip";
import { DebugMenu } from "./DebugMenu";
import { UserMenu } from "./UserMenu";


export type NavigationBarProps = {
    className?: string;
}

@observer
export class NavigationBar extends React.Component<NavigationBarProps> {

    @inject(MainStore)
    private mainStore: MainStore;

    @inject(ConfigStore)
    private configStore: ConfigStore;

    render() {
        const { className } = this.props;

        return (
            <Navbar className={className}>

                <NavbarGroup align={Alignment.LEFT}>
                    <DashboardsButton active={this.mainStore.isDashboardDialogVisible}
                                      onClick={this.mainStore.showDashboardDialog}/>

                    <WidgetsButton active={this.mainStore.isWidgetToolbarOpen}
                                   onClick={this.mainStore.toggleWidgetToolbar}/>

                    <HelpButton active={this.mainStore.isHelpDialogVisible}
                                onClick={this.mainStore.showHelpDialog}/>

                    <HelpButton active={this.mainStore.isLoginDialogOpen}
                                onClick={this.mainStore.showLoginDialog}/>
                </NavbarGroup>

                <NavbarGroup align={Alignment.CENTER}>
                    <NavbarHeading>OZONE Widget Framework</NavbarHeading>
                </NavbarGroup>

                <NavbarGroup align={Alignment.RIGHT}>
                    <DebugMenuButton/>
                    <UserMenuButton userName={this.configStore.userDisplayName}/>
                </NavbarGroup>

            </Navbar>
        )
    }

}


type MenuButtonProps = {
    active: boolean;
    onClick: () => void;
}

const DashboardsButton: React.SFC<MenuButtonProps> =
    ({ active, onClick }) => (
        <NavbarTooltip title="Dashboards"
                       shortcut="alt+shift+c"
                       description="Open the Dashboards window to start or manage your Dashboards.">
            <Button minimal
                    text="Dashboards"
                    icon="control"
                    active={active}
                    onClick={onClick}/>
        </NavbarTooltip>
    );


const WidgetsButton: React.SFC<MenuButtonProps> =
    ({ active, onClick }) => (
        <NavbarTooltip title="Widgets"
                       shortcut="alt+shift+f"
                       description="Open or close the Widgets toolbar to add Widgets to your Dashboard.">
            <Button minimal
                    text="Widgets"
                    icon="widget"
                    active={active}
                    onClick={onClick}/>
        </NavbarTooltip>
    );


const HelpButton: React.SFC<MenuButtonProps> =
    ({ active, onClick }) => (
        <NavbarTooltip title="Help"
                       shortcut="alt+shift+h"
                       description="Show the Help window.">
            <Button minimal
                    icon="help"
                    active={active}
                    onClick={onClick}/>
        </NavbarTooltip>
    );


type UserMenuButtonProps = {
    userName: string;
}

const UserMenuButton: React.SFC<UserMenuButtonProps> =
    ({ userName }) => (
        <NavbarTooltip title="User Profile"
                       description="Open the User Profile options window.">
            <Popover content={<UserMenu/>}
                     minimal
                     position={Position.BOTTOM_RIGHT}
                     modifiers={{ arrow: { enabled: false } }}>
                <Button minimal
                        text={userName}
                        icon="user"
                        rightIcon="caret-down"/>
            </Popover>
        </NavbarTooltip>
    );


const DebugMenuButton: React.SFC =
    () => (
        <NavbarTooltip title="User Profile"
                       description="Open the User Profile options window.">
            <Popover content={<DebugMenu/>}
                     minimal
                     position={Position.BOTTOM_RIGHT}
                     modifiers={{ arrow: { enabled: false } }}>
                <Button minimal
                        text="Debug"
                        icon="cog"
                        rightIcon="caret-down"/>
            </Popover>
        </NavbarTooltip>
    );
