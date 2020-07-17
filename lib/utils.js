"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = exports.writeBundle = exports.getEmoji = exports.getConfigPath = void 0;
var node_emoji_1 = __importDefault(require("node-emoji"));
var path_1 = require("path");
var fs = __importStar(require("fs"));
var default_json_1 = require("./default.json");
/**
 * Find config file from dir list
 * @param configPath - Configuration file path
 * @returns {string}
 */
function getConfigPath(configPath) {
    if (configPath === void 0) { configPath = null; }
    var pwd = process.cwd();
    var path;
    if (configPath) {
        path = path_1.join(configPath, default_json_1.configFileName);
    }
    else {
        // Iterate until root dir
        var base = pwd;
        var index = base.lastIndexOf(path_1.sep);
        while (index !== -1) {
            var abspath = path_1.join(base, default_json_1.configFileName);
            if (fs.existsSync(abspath)) {
                path = abspath;
                break;
            }
            // Reduce base dir
            base = base.slice(0, index);
            index = base.lastIndexOf(path_1.sep);
        }
    }
    return path;
}
exports.getConfigPath = getConfigPath;
/**
 * Get emoji from "emoji" module
 * @param name - Emoji name
 * @param fallback - Fallback text
 * @returns {string}
 */
function getEmoji(name, fallback) {
    return node_emoji_1.default.hasEmoji(name) ? node_emoji_1.default.get(name) : fallback;
}
exports.getEmoji = getEmoji;
/**
 * Write source bundle
 * @param sources - Source Array
 * @param outfile - Outfile path
 * @returns {boolean}
 */
function writeBundle(sources, outfile) {
    var path = (path_1.isAbsolute(outfile)) ? outfile : path_1.join(path_1.dirname(getConfigPath()), outfile);
    var isExists;
    isExists = fs.existsSync(path);
    fs.writeFileSync(path, sources.join('\n'), 'UTF-8');
    return isExists;
}
exports.writeBundle = writeBundle;
/**
 * Get config
 * @returns {BunderConfig}
 */
function getConfig() {
    var configPath = getConfigPath();
    if (!configPath) {
        throw new Error("Can't find " + default_json_1.configFileName);
    }
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}
exports.getConfig = getConfig;
