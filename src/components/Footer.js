import React from "react";

import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="container my-5">
      <div className="container row mx-5">
        <div className="col-lg-3">
          <h5>About Cake Time</h5>
          <p>Cake Time Vietnam</p>
          <p>Career</p>
          <p>Blog</p>
          <p>Investment</p>
        </div>
        <div className="col-lg-3">
          <h5>Contact</h5>
          <p>caketime@gmail.com</p>
          <p>19006969</p>
          <p>19006969</p>
        </div>
        <div className="col-lg-3">
          <h5>Follow us on</h5>
          <p>
            <span>
              <FaFacebook />
            </span>
          </p>
          <p>
            <span>
              <FaGithub />
            </span>
          </p>
          <p>
            <span>
              <FaTwitter />
            </span>
          </p>
          <p>
            <span>
              <FaInstagram />
            </span>
          </p>
        </div>
        <div className="col-lg-3">
          <h5>Let us help you</h5>
          <p>Help</p>
          <p>Shipping</p>
          <p>Return</p>
          <p>Manage</p>
        </div>
      </div>
      <div className="text-center">
        Make with{" "}
        <span style={{ color: "#B91319" }}>
          <i class="fas fa-heart"></i>
        </span>{" "}
        by <a href="https://github.com/nhuhung19">Hung Ta</a>
      </div>
    </div>
  );
}
