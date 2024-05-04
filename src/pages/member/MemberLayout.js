import React from "react";
import { Outlet,} from "react-router-dom";

import { MemberSidebar } from "../../components";

const MemberLayout = () =>{

    return(
        <div className="flex">
            <MemberSidebar />
            <div className="flex-auto bg-gray-100 min-h-screen">
                <Outlet />
            </div>
        </div>
    )
}
export default MemberLayout