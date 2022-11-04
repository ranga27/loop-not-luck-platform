import React from 'react';
import { NavLink } from 'react-router-dom';
import appInfo from '../../../package.json';
import Tiktok from '../../assets/img/tiktok.svg';

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="footer-content">
        <div className="container-fluid">
          <div className="row text-center">
            <div className="col-md-3">
              <span className="">
                Loop Not Luck 2022 Version: {appInfo.version}
              </span>
            </div>
            <div className="col-md-6">
              <ul className="list-inline social-buttons">
                <li className="list-inline-item">
                  <a
                    href="https://www.tiktok.com/@loopnotluck"
                    target="_blank"
                    rel="noreferrer"
                    style={{ paddingBottom: '20px' }}
                  >
                    <img
                      alt="Reds"
                      src={Tiktok}
                      style={{
                        paddingBottom: '10px',
                        fontSize: '2px',
                        width: '30px',
                        height: '30px',
                      }}
                    />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="https://www.instagram.com/loopnotluck/"
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: '20px', paddingRight: '5px' }}
                  >
                    <i className="simple-icon-social-instagram" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="https://www.linkedin.com/company/loopnotluck/"
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: '20px' }}
                  >
                    <i className="simple-icon-social-linkedin" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <ul className="list-inline">
                <li className="list-inline-item">
                  <NavLink to="privacy">Privacy Policy</NavLink>
                </li>
                <span>| </span>
                <li className="list-inline-item">
                  <NavLink to="terms-and-conditions">
                    Terms & Conditions
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
