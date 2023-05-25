import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import BelcanLogo from "./assets/demo/images/belcan_logo.png";
import { ILogin, logout } from './features/Login/Loginslice';
import { RootState } from './app/store';
import { connect, useSelector } from 'react-redux';
import { TieredMenu } from 'primereact/tieredmenu';
import { useDispatch } from 'react-redux';
import { Menubar } from 'primereact/menubar';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
// import { MenuItem } from 'primereact/menuitem';
import { PanelMenu } from 'primereact/panelmenu';
import { Dock } from 'primereact/dock';
import { getuserroles } from './features/Login/LoginSelector';
import Banner from "./assets/demo/images/banner.JPG";
import { url } from 'inspector';
interface Itiredmenu {
    label: string,
    icon: string,
    items:
    {
        label: string,
        icon: string
    }[]


}
const AppTopbar = (props) => {
    const menu = useRef(null);
    const menuoperations = useRef(null);
    const profile = useRef(null);
    const navigate = useNavigate()
    const Logindata: ILogin = useSelector((state: RootState) => state.Login);
    const dispatch = useDispatch()
    const roles = props.getuserrolesprop
    const [profilemenuitems, setprofilemenuitems] = useState([

        {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Settings',
                    icon: 'pi pi-fw pi-cog'
                },
                {
                    label: 'Billing',
                    icon: 'pi pi-fw pi-file'
                }
            ]
        },

        {
            label: 'Roles',
            icon: 'pi pi-fw pi-user-plus',
            items: [{
                label: 'Settings',
                icon: 'pi pi-fw pi-cog'
            },
            {
                label: 'Billing',
                icon: 'pi pi-fw pi-file'
            }]

        },
        {
            label: 'Quit',
            icon: 'pi pi-fw pi-sign-out',
            command: () => {dispatch(logout())}

        }
    ]);
    const [profilemenuitemscandidate] = useState([



        {
            label: 'Quit',
            icon: 'pi pi-fw pi-sign-out',
            command: () => {dispatch(logout())}

        }
    ]);
    useEffect(() => {
        // console.log(Logindata)
        // console.log(profilemenuitems)
        // console.log( profilemenuitems.filter((i)=>i.label=="Roles")[0])
        var temproles: any = []
        Logindata.groups.forEach(element => {
            temproles.push(
                {
                    "label": element.name,
                    "icon": 'pi pi-fw pi-user-plus',

                }
            )
        }
        )
        // console.log(temproles)
        // var temptemp=JSON.parse(JSON.stringify(  profilemenuitems))
        // // var temptemp={...profilemenuitems}
        // console.log(temptemp)
        //     //  temptemp=profilemenuitems.filter((i)=>i.label=="Roles")[0].items=temproles
        //      temptemp=profilemenuitems[1].items=temproles

        //        setprofilemenuitems(temptemp)




        setprofilemenuitems([


            {
                label: 'Profile',
                icon: 'pi pi-fw pi-user',
                items: [
                    // {
                    //     label: 'Settings',
                    //     icon: 'pi pi-fw pi-cog'
                    // },
                    // {
                    //     label: 'Billing',
                    //     icon: 'pi pi-fw pi-file'
                    // },
                    {
                        label: 'Quit',
                        icon: 'pi pi-fw pi-sign-out',
                        command: () => {dispatch(logout())},


                    }
                ]
            },

            {
                label: 'Roles',
                icon: 'pi pi-fw pi-user-plus',
                items: temproles

            },

        ])

    }, [])
    const tieredMenuItems: Itiredmenu = {
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        items: [

        ]
    }
    useEffect(() => {

        Logindata.groups ? Logindata.groups.forEach(e => {
            // console.log(e.name)
            tieredMenuItems.items.push({
                label: e.name.toString(),
                icon: 'pi pi-fw pi-user'
            })
        }) : console.log();
        // console.log(Logindata)
        // console.log(Logindata.groups.some(
        //     function checkAge(i) {
        //         return i.name== "Administrator";
        //       }



        // ))

    })
    const Adminmenuitems = [

        // {
        // label: 'Administration',
        // label: 'Administration', icon: 'pi pi-fw pi-search',
        // items: [



        {
            label: 'Manage Industry',  icon: 'pi pi-th-large', command: () => navigate("/Industry")

        },
        {
            label: 'Manage Company',  icon: 'pi pi-th-large', command: () => navigate("/Managecompany"),
        },
        {
            label: 'Manage Business Unit', icon: 'pi pi-th-large', command: () => navigate("/ManageBusinessUnit"),
        },
        {
            label: 'Manage Service Line', icon: 'pi pi-th-large', command: () => navigate("/serviceline"),
        },
        // {
        //     label: 'Roles', icon: 'pi pi-bars',to: '/manage Roles' ,
        // },



        {
            label: 'Manage Customer', icon: 'pi pi-th-large', command: () => navigate("/ManageCustomer"),
        },
        {
            label: 'Manage Location', icon: 'pi pi-th-large', command: () => navigate("/Location"),
        },

        {
            label: 'Manage Experience Level', icon: 'pi pi-th-large', command: () => navigate("/ManageExperienceLevel"),
        },
        {

            label: 'Manage Avg Approved CTC/Bill Rate', icon: 'pi pi-th-large', command: () => navigate("/AvgCTC"),

        },
        {
            label: 'Manage Designation', icon: 'pi pi-th-large', command: () => navigate("/ManageDesignation"),
        },
        {
            label: 'Manage User Roles', icon: 'pi pi-th-large', command: () => navigate("/userroles"),
        },
        {

            label: 'Manage Band', icon: 'pi pi-th-large', command: () => navigate("/Band"),

        },
        {
            label: 'Manage Sub Band', icon: 'pi pi-th-large', command: () => navigate("/ManageSubBand"),
        },


        {

            label: 'Manage Insurance/Accident Limit', icon: 'pi pi-th-large', command: () => navigate("/Insurance"),

        },
        {

            label: 'Manage Department/Vendor', icon: 'pi pi-th-large', command: () => navigate("/ManageDepartment"),

        },




    ];
    const HRmenuitems = [

        {
            label: 'Acceptedcandidates', icon: 'pi pi-bars', command: () => navigate("/acceptedcandidates")

        },

    ];

    return (
        <div className="layout-topbar" style={{backgroundImage : `url('/HRWorkflowPortal/banner.jpg')` }}  >
            {/* <span style={{position:"fixed",left:"0px"}}> */}

            {/* <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars"/>
            </button> */}
            {/* </span> */}
            {/* <span style={{width:"50px"}}></span> */}
            {<Link to={roles.includes("Candidate") ? '/candidatedashboard':'/dashboard'}  className="layout-topbar-logo mr-4" style={{ color: 'white' }}>
                <img src={props.layoutColorMode === 'light' ? BelcanLogo : BelcanLogo} alt="logo" />

            </Link>}
            {/* <span className="layout-topbar-logo" style={{ color:'white'}}>HR WORKFLOW</span> */}

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>


            {/* <Menubar model={nestedMenuitems}  end={null}></Menubar> */}
            {/* <Menu model={nestedMenuitems}  >
</Menu> */}

            <Button className="mr-2" label="Dashboard" icon="pi pi-bars" onClick={(event) => roles.includes("Candidate") ?navigate('/candidatedashboard') : navigate('/dashboard')} />
            {Logindata.groups.some(
                function checkAge(i) {
                    return i.name == "Administrator";
                }



            ) && <><Menu model={Adminmenuitems} style={{width:'auto'}} popup ref={menu} id="popup_menu" />
                    <Button label="Administration" icon="pi pi-users" onMouseEnter={(event) => menu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup />
                </>}



            {Logindata.groups.some(
                function checkAge(i) {
                    return i.name == "HR";
                }



            ) && <><Menu model={HRmenuitems} popup ref={menuoperations} id="popuphr_menu" />
                    {/* <Button label="Operations" icon="pi pi-users" onMouseEnter={(event) => menuoperations.current.toggle(event)} aria-controls="popup_menu" aria-haspopup /> */}
                    <Button label="On-Boarding Dashboard" className='ml-2' icon="pi pi-users" onClick={(event) =>navigate('/acceptedcandidates') }/>
                </>}





            {/* <Menubar  model={Adminmenuitems} style={{backgroundColour:"blue"}} ></Menubar> */}



            <ul className={classNames("layout-topbar-menu lg:flex origin-top", { 'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}>
                {/* <li>
                        <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                            <i className="pi pi-calendar"/>
                            <span>Events</span>
                        </button>
                    </li>
                    <li>
                        <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                            <i className="pi pi-cog"/>
                            <span>Settings</span>
                        </button>
                    </li> */}
                {/* <span>{Logindata.first_name}</span>/ */}
                <span style={{ color: "white", fontSize: 16, marginTop: 10, paddingRight: "20px" }}>{Logindata.first_name + " , " + Logindata.last_name}</span>
                {/* <span> , </span> */}
                {/* <span>{Logindata.last_name}</span> */}
                <span> </span>
                {/* <TieredMenu model={[tieredMenuItems]}  /> */}
                <Menu model={roles.includes("Candidate") ? profilemenuitemscandidate : profilemenuitems} popup ref={profile} id="popup_menu1" ></Menu>

                <li>
                    <button className="p-link layout-topbar-button" onClick={(event) => profile.current.toggle(event)} aria-controls="popup_menu1" aria-haspopup>
                        <i className="pi pi-user" />
                        <span>Profile</span>
                    </button>
                </li>
            </ul>
        </div>
    );
}


function mapStateToProps(state) {
    return {

        getuserrolesprop: getuserroles(state)
    };
}
export default connect(mapStateToProps)(AppTopbar);
