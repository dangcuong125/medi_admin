// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';
import i18n from 'src/common/locales/i18n';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
    <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
    blog: getIcon('ic_blog'),
    cart: getIcon('ic_cart'),
    chat: getIcon('ic_chat'),
    mail: getIcon('ic_mail'),
    user: getIcon('ic_user'),
    kanban: getIcon('ic_kanban'),
    banking: getIcon('ic_banking'),
    booking: getIcon('ic_booking'),
    invoice: getIcon('ic_invoice'),
    calendar: getIcon('ic_calendar'),
    ecommerce: getIcon('ic_ecommerce'),
    analytics: getIcon('ic_analytics'),
    dashboard: getIcon('ic_dashboard'),
    menuItem: getIcon('ic_menu_item'),
    setting: getIcon('ic_menu_item'),
    policy: getIcon('ic_policy'),
    document: getIcon('ic_policy'),

    administration: getIcon('ic_mail'),
    addNewGroup: getIcon('Icon Base'),
};

const navConfig = [
    // GENERAL
    // ----------------------------------------------------------------------
    {
        subheader: 'Management',
        items: [
            {
                title: 'admin',
                path: PATH_DASHBOARD.admin.list,
                icon: ICONS.policy,
                resource: 'admin',
                children: [
                    {
                        title: 'list',
                        path: PATH_DASHBOARD.admin.list,
                    },
                    {
                        title: 'create',
                        path: PATH_DASHBOARD.admin.create,
                    },
                ],
            },
            {
                title: 'Merchant',
                resource: 'merchant',
                path: PATH_DASHBOARD.merchant.root,
                icon: ICONS.blog,
                children: [
                    {
                        title: 'List Merchants',
                        path: PATH_DASHBOARD.merchant.list,
                    },
                ],
            },
            {
                title: 'event',
                path: '',
                icon: ICONS.user,
                resource: 'event',
                children: [
                    {
                        title: 'list',
                        path: PATH_DASHBOARD.event.list,
                    },
                ],
            },
            {
                title: 'User',
                path: PATH_DASHBOARD.general.user,
                icon: ICONS.cart,
                resource: 'user',
                children: [
                    {
                        title: 'List User',
                        path: PATH_DASHBOARD.user.root,
                    },
                ],
            },
            {
                title: 'Administration',
                path: '',
                icon: ICONS.administration,
                children: [
                    { title: 'List', path: PATH_DASHBOARD.general.administrationList },
                    {
                        title: 'Create',
                        path: PATH_DASHBOARD.general.administrationCreateGroup,
                    },
                ],
            },
            {
                title: 'Product',
                path: '',
                icon: ICONS.menuItem,
                children: [
                    { title: 'List', path: PATH_DASHBOARD.product.list },
                ]
            },
            {
                title: i18n.t('gift'),
                path: PATH_DASHBOARD.gift.root,
                icon: ICONS.ecommerce,
                children: [
                    { title: i18n.t('list'), path: PATH_DASHBOARD.gift.list }
                ]

            }
        ],
    },
];

export default navConfig;
