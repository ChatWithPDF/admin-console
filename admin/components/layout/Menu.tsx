import * as React from "react";
import { Menu } from 'react-admin';
import { MenuItemsWithPermissionResolver } from "./MenuOptions";
import { usePermissions } from "ra-core";
import DescriptionIcon from '@mui/icons-material/Description';


const getIcon = (resource: String) => {
    switch (resource) {
        case 'embeddings': return <DescriptionIcon />
        default: return <></>;
    }
}

const MyMenu = () => {
    const { permissions } = usePermissions();
    return (
        <Menu>
            {MenuItemsWithPermissionResolver(permissions).map((option) => {
                return (
                    <Menu.Item
                        key={option.name}
                        to={`/${option.resource}`}
                        state={{ _scrollToTop: true }}
                        primaryText={option.name}
                        leftIcon={getIcon(option.resource)}
                        />
                        );
                    })}
        </Menu>
    );
};

export default MyMenu;
