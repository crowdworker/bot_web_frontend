import * as React from "react";
import { Link } from "react-router";
import { sendCommand } from "../devices/actions";
import { AuthState } from "../auth/interfaces";
import { BotState } from "../devices/interfaces";
import { Ticker } from "../ticker/ticker";
import { Everything } from "../interfaces";

interface NavButtonState {
  auth: AuthState;
  dispatch: Function;
  bot: BotState;
  onClick?: () => void;
}

interface LogoutProps {
  auth: AuthState;
  onClick?: () => void;
}

export let LogoutButton = ({ auth, onClick }: LogoutProps) => {
  if (!auth.authenticated) { return <span></span>; }
  onClick = onClick || (() => {
    sessionStorage.clear();
    location.reload();
  });
  return <a className="logout-button"
    onClick={ onClick }>
    Log Out
  </a>;
};

let SyncButton = ({auth, dispatch}: NavButtonState) => {
  if (!auth.authenticated) { return <span></span>; }
  return <button className="nav-sync button-like green"
    onClick={
      () => dispatch(sendCommand({ name: "syncSequence" }))
    }>
    Sync
  </button>;
};

let EStopButton = ({auth, dispatch}: NavButtonState) => {
  if (!auth.authenticated) { return <span></span>; }
  return <button className="nav-e-stop button-like red"
    type="button"
    onClick={ () => dispatch(sendCommand({ name: "emergencyStop" })) } >
    E-Stop
  </button>;
};

let links = {
  "Farm Designer": "/app/dashboard/designer",
  "Controls": "/app/dashboard/controls",
  "Device": "/app/dashboard/devices",
  "Sequences": "/app/dashboard/sequences",
  "Regimens": "/app/dashboard/regimens"
};

export function Navbar(props: Everything) {
  return (
    <nav className="navbar navbar-default" role="navigation">
      <div className="container-fluid">
        <div className="navbar-header drop-shadow">
          <button className="navbar-toggle"
            data-target="#navbar"
            data-toggle="collapse"
            type="button">
            <span className="glyphicon glyphicon-menu-hamburger" />
          </button>
        </div>
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="nav navbar-nav">
            {
              Object.keys(links).map((description) => {
                let url = (links as {[name: string]: string})[description];
                return (
                  <li key={url}>
                    <Link to={url}>{description}</Link>
                  </li>
                );
              })
            }
          </ul>
          <SyncButton { ...props }/>
          <Ticker { ...props }/>
          <LogoutButton { ...props }/>
          <EStopButton { ...props }/>
        </div>
      </div>
    </nav>
  );
};
