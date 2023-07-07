// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
struct Data {
string time;
string X;
string Y;
string Z;
string V;
string MAx;
string MAy;
string MAz;
string MAv;
}
mapping(bytes32 => Data) public dataMap;

function addData(string memory time, string memory X, string memory Y, string memory Z, string memory V, string memory MAx, string memory MAy, string memory MAz, string memory MAv) public {
    bytes32 id = keccak256(abi.encodePacked(time, X, Y, Z, V, MAx, MAy, MAz, MAv));
    dataMap[id] = Data(time, X, Y, Z, V, MAx, MAy, MAz, MAv);
}
}