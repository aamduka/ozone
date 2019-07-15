import * as React from "react";

import { SelectionDialogProps, TableSelectionDialog } from "../../../table-selection-dialog/TableSelectionDialog";
import { userApi } from "../../../../api/clients/UserAPI";
import { UserDTO } from "../../../../api/models/UserDTO";
import { ColumnTabulator } from "../../../generic-table/GenericTable";

export class GroupUsersEditDialog extends React.Component<SelectionDialogProps<UserDTO>> {
    constructor(props: SelectionDialogProps<UserDTO>) {
        super(props);
    }

    render() {
        return (
            <TableSelectionDialog
                title="Add User(s) to Group"
                show={this.props.show}
                getItems={this.getAllUsers}
                columns={
                    [
                        { title: "Name", field: "userRealName" },
                        { title: "Username", field: "username" },
                        { title: "Email", field: "email" },
                        { title: "Groups", field: "totalGroups" },
                        { title: "Widgets", field: "totalWidgets" },
                        { title: "Dashboards", field: "totalDashboards" },
                        { title: "Last Login", field: "lastLogin" }
                    ] as ColumnTabulator[]
                }
                onSubmit={this.props.onSubmit}
                onClose={this.props.onClose}
            />
        );
    }

    protected async getAllUsers(): Promise<Array<UserDTO>> {
        const response = await userApi.getUsers();

        if (response.status !== 200) return [];

        return response.data.data;
    }
}
