import { Layout } from "antd";
import { Content, Header, Footer } from "antd/es/layout/layout";
import React from "react";
import { Outlet } from "react-router";
import "./SiteLayout.css"

function SiteLayout() {
    return (
        <Layout>
            <Header className="sitelayout-header">DPMC Comparator Tool</Header>
            <Content className="sitelayout-bg">
                <Outlet />
            </Content>
            <Footer className="sitelayout-footer">DPMC {new Date().getFullYear()} Created by CASTRDE</Footer>
        </Layout>
    )

}

export default SiteLayout;