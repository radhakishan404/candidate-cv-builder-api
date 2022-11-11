"use strict";
import multer from "multer";
import fs from "fs";

import { responseSend } from "../helpers/responseSend.js";

export const imageProcessingProfilePic = async (req, res, next, filesize = 5000000) => {
  try {
    let p = "/profile";
    let dir = "./public";
    var d = new Date();
    let files = "";
    if (!fs.existsSync(dir)) {
      fs.mkdir(dir, function () {
        fs.statSync(dir).isDirectory();
      });
    }
    let signFilter = function (req, file, cb) {
      file.originalname = file.originalname.toLowerCase();
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(
          {
            error:
              "Invalid file format!. Only .jpg,.jpeg,.png formats are allowed."
          },
          false
        );
      }
      cb(null, true);
    };
    dir += p;
    if (!fs.existsSync(dir)) {
      fs.mkdir(dir, function () {
        fs.statSync(dir).isDirectory();
      });
    }
    let Storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, dir);
      },
      filename: function (req, file, callback) {
        var fileExt = file.originalname.split('.').pop().toLowerCase();
        var fileUnique = Math.round(Math.random() * (999999 - 100000) + 100000);
        let filename = fileUnique + "-" + d.getTime() + "." + fileExt;
        files = dir + `/${filename}`;
        callback(null, filename);
      }
    });
    let signUpload = multer({
      storage: Storage,
      limits: { fileSize: filesize },
      fileFilter: signFilter
    }).any();
    signUpload(req, res, err => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE")
          responseSend(res, 417, "File size exceeded, must be below " + filesize / 1000000 + "MB.");
        else responseSend(res, 417, err, null);
      } else {
        console.log(req.files);
        if (req.files && req.files.length > 0) {
          req.body.image = req.files[0]
          next();
        } else {
          responseSend(res, 417, "Please Upload a file.", null)
        }
      }
    });
  } catch (error) {
    responseSend(res, 417, error.message, null);
  }
};
