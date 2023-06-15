import React, { useState, useEffect } from "react";
import { axiosWithBaseUrl } from "App";
import { Select, Button } from "antd";
import DepositShopList from "../deposit/shop";
import DepositList from "../deposit/list";

const { Option } = Select;

function Filter() {
  const [branchID, setBranchID] = useState("");
  const [shopID, setShopID] = useState("");
  const [branchOptions, setBranchOptions] = useState([]);
  const [shopOptions, setShopOptions] = useState([]);
  const [selectedBranchName, setSelectedBranchName] = useState("");
  const [selectedShopName, setSelectedShopName] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  
  // Define the state and setState function for depositBranchID
  const [depositBranchID, setDepositBranchID] = useState("");

  useEffect(() => {
    axiosWithBaseUrl
      .get("/branch/all")
      .then((response) => {
        setBranchOptions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const handleBranchIDChange = (value) => {
    setBranchID(value);
    setSelectedBranchName(branchOptions.find((branch) => branch.id === value)?.name || "");
    setShopID("");
    setSelectedShopName("");
    if (value) {
      axiosWithBaseUrl
        .get(`/admin/deposit/branch/${value}`)
        .then((response) => {
          setShopOptions(response.data.content);
          console.log(response.data.content);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setShopOptions([]);
    }
    // Update the branchID value in DepositList component
    setDepositBranchID(value);
  };

  const handleShopIDChange = (value) => {
    setShopID(value);
    setSelectedShopName(shopOptions.find((shop) => shop.id === value)?.name || "");
  };

  const handleSearch = () => {
    setIsFiltering(true);
  };

  useEffect(() => {
    if (isFiltering) {
      console.log("Filtering...");
      setIsFiltering(false);
    }
  }, [isFiltering]);

  return (
    <div>
      <h1>Filter</h1>
      <Select value={branchID} onChange={handleBranchIDChange}>
        {branchOptions.map((branch) => (
        <Option key={branch.id} value={branch.id}>
        {branch.name}
        </Option>
        ))}
      </Select>

      <Select value={shopID} onChange={handleShopIDChange}>
        {shopOptions.map((shop) => (
        <Option key={shop.id} value={shop.id}>
        {shop.name}
        </Option>
        ))}
      </Select>

      <Button type="primary" onClick={handleSearch}>
        Search
      </Button>

      {selectedBranchName && selectedShopName && (
        <>
          <h2>Selected Branch: {selectedBranchName}</h2>
          <h2>Selected Shop: {selectedShopName}</h2>
          <DepositList branchID={branchID} />
          <DepositShopList shopID={shopID} />
        </>
      )}
    </div>
  );
}

export default Filter;

