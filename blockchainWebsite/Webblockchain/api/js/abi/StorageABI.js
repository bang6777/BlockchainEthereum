var sanphamABI=[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_Idsanpham",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "SetLogDeletesanphamManagement",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_Idsanpham",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_Nguoibanle",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_Noibanle",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_Cachthucbanle",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_Baoquanbanle",
				"type": "string"
			}
		],
		"name": "Setbanle",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_Idsanpham",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_Khuvuctrongcayantrai",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_Nguoitrongcayantrai",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_Phanboncayantrai",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_Thoivucayantrai",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_Soluongcayantrai",
				"type": "string"
			}
		],
		"name": "Setcayantrai",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_Idsanpham",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_Khuvuctrongcaygiong",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_Nguoitrongcaygiong",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_Phanboncaygiong",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_Thoivucaygiong",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_Soluongcaygiong",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_Dientichcaygiong",
				"type": "string"
			}
		],
		"name": "Setcaygiong",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_Idsanpham",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_Diadiemnhan",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_Noiphanphoi",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_Cachthucphanphoi",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_Donggoiphanphoi",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_Baoquanphanphoi",
				"type": "string"
			}
		],
		"name": "Setphanphoi",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_Idsanpham",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_Tensanpham",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_anh",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_thoigiantao",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_thoigianchinhsua",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_trangthai",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "Setsanpham",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_Idsanpham",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_Nguoithumua",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_Noithumua",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_Cachthucthumua",
				"type": "string"
			}
		],
		"name": "Setthumua",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_Idsanpham",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_tensanpham",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_anh",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_thoigianchinhsua",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_trangthai",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "updatesanpham",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_sanphamAddress",
				"type": "address"
			}
		],
		"name": "deletesanpham",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_Idsanpham",
				"type": "address"
			}
		],
		"name": "getCaygiong",
		"outputs": [
			{
				"internalType": "address",
				"name": "Idsanpham",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_Khuvuctrongcaygiong",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Nguoitrongcaygiong",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Phanboncaygiong",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Thoivucaygiong",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Soluongcaygiong",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Dientichcaygiong",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_Idsanpham",
				"type": "address"
			}
		],
		"name": "getbanle",
		"outputs": [
			{
				"internalType": "address",
				"name": "Idsanpham",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_Nguoibanle",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Noibanle",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Cachthucbanle",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Baoquanbanle",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_Idsanpham",
				"type": "address"
			}
		],
		"name": "getcayantrai",
		"outputs": [
			{
				"internalType": "address",
				"name": "Idsanpham",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_Khuvuctrongcayantrai",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Nguoitrongcayantrai",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Phanboncayantrai",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Thoivucayantrai",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Soluongcayantrai",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_Idsanpham",
				"type": "address"
			}
		],
		"name": "getphanphoi",
		"outputs": [
			{
				"internalType": "address",
				"name": "Idsanpham",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_Diadiemnhan",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Noiphanphoi",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Cachthucphanphoi",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Donggoiphanphoi",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Baoquanphanphoi",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_Idsanpham",
				"type": "address"
			}
		],
		"name": "getsanpham",
		"outputs": [
			{
				"internalType": "address",
				"name": "Idsanpham",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_Tensanpham",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_anh",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_thoigiantao",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_thoigianchinhsua",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_trangthai",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getsanphamAtIndex",
		"outputs": [
			{
				"internalType": "address",
				"name": "Idsanpham",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getsanphamCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "count",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_Idsanpham",
				"type": "address"
			}
		],
		"name": "getthumua",
		"outputs": [
			{
				"internalType": "address",
				"name": "Idsanpham",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_Nguoithumua",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Noithumua",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Cachthucthumua",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_Idsanpham",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_Khuvuctrongcaygiong",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Nguoitrongcaygiong",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Phanboncaygiong",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Thoivucaygiong",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Soluongcaygiong",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Dientichcaygiong",
				"type": "string"
			}
		],
		"name": "insertCaygiong",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_Idsanpham",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_Nguoibanle",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Noibanle",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Cachthucbanle",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Baoquanbanle",
				"type": "string"
			}
		],
		"name": "insertbanle",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_Idsanpham",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_Khuvuctrongcayantrai",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Nguoitrongcayantrai",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Phanboncayantrai",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Thoivucayantrai",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Soluongcayantrai",
				"type": "string"
			}
		],
		"name": "insertcayantrai",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_Idsanpham",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_Diadiemnhan",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Noiphanphoi",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Cachthucphanphoi",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Donggoiphanphoi",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Baoquanphanphoi",
				"type": "string"
			}
		],
		"name": "insertphanphoi",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_Idsanpham",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_Tensanpham",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_anh",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_thoigiantao",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_thoigianchinhsua",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_trangthai",
				"type": "string"
			}
		],
		"name": "insertsanpham",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_Idsanpham",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_Nguoithumua",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Noithumua",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Cachthucthumua",
				"type": "string"
			}
		],
		"name": "insertthumua",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_Idsanpham",
				"type": "address"
			}
		],
		"name": "issanpham",
		"outputs": [
			{
				"internalType": "bool",
				"name": "isIndeed",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_Idsanpham",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_thoigianchinhsua",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_trangthai",
				"type": "string"
			}
		],
		"name": "updatetrangthai",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
var userABI=[
	{
		"constant": false,
		"inputs": [
			{
				"name": "_Iduser",
				"type": "address"
			},
			{
				"name": "_role",
				"type": "string"
			},
			{
				"name": "_thoigianchinhsua",
				"type": "string"
			}
		],
		"name": "updaterole",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_Iduser",
				"type": "address"
			},
			{
				"name": "_username",
				"type": "string"
			},
			{
				"name": "_thoigianchinhsua",
				"type": "string"
			}
		],
		"name": "updateusername",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "deleteuser",
		"outputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_Iduser",
				"type": "address"
			},
			{
				"name": "_email",
				"type": "string"
			},
			{
				"name": "_thoigianchinhsua",
				"type": "string"
			}
		],
		"name": "updateemail",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getuserAtIndex",
		"outputs": [
			{
				"name": "Iduser",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_Iduser",
				"type": "address"
			},
			{
				"name": "_gioitinh",
				"type": "string"
			},
			{
				"name": "_thoigianchinhsua",
				"type": "string"
			}
		],
		"name": "updategioitinh",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_Iduser",
				"type": "address"
			},
			{
				"name": "_sdt",
				"type": "string"
			},
			{
				"name": "_thoigianchinhsua",
				"type": "string"
			}
		],
		"name": "updatesdt",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_Iduser",
				"type": "address"
			},
			{
				"name": "_pass",
				"type": "string"
			},
			{
				"name": "_thoigianchinhsua",
				"type": "string"
			}
		],
		"name": "updatepass",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_Iduser",
				"type": "address"
			},
			{
				"name": "_username",
				"type": "string"
			},
			{
				"name": "_email",
				"type": "string"
			},
			{
				"name": "_pass",
				"type": "string"
			},
			{
				"name": "_gioitinh",
				"type": "string"
			},
			{
				"name": "_ngaysinh",
				"type": "string"
			},
			{
				"name": "_sdt",
				"type": "string"
			}
		],
		"name": "insertuser",
		"outputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_Iduser",
				"type": "address"
			},
			{
				"name": "_anhdaidien",
				"type": "string"
			},
			{
				"name": "_thoigianchinhsua",
				"type": "string"
			}
		],
		"name": "updateanhdaidien",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getuserCount",
		"outputs": [
			{
				"name": "count",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_Iduser",
				"type": "address"
			}
		],
		"name": "getuserdetail",
		"outputs": [
			{
				"name": "Iduser",
				"type": "address"
			},
			{
				"name": "_diachi",
				"type": "string"
			},
			{
				"name": "_anhdaidien",
				"type": "string"
			},
			{
				"name": "_thoigiantao",
				"type": "string"
			},
			{
				"name": "_thoigianchinhsua",
				"type": "string"
			},
			{
				"name": "_role",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_Iduser",
				"type": "address"
			}
		],
		"name": "getuser",
		"outputs": [
			{
				"name": "Iduser",
				"type": "address"
			},
			{
				"name": "_username",
				"type": "string"
			},
			{
				"name": "_email",
				"type": "string"
			},
			{
				"name": "_pass",
				"type": "string"
			},
			{
				"name": "_gioitinh",
				"type": "string"
			},
			{
				"name": "_ngaysinh",
				"type": "string"
			},
			{
				"name": "_sdt",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_Iduser",
				"type": "address"
			},
			{
				"name": "_diachi",
				"type": "string"
			},
			{
				"name": "_anhdaidien",
				"type": "string"
			},
			{
				"name": "_thoigiantao",
				"type": "string"
			},
			{
				"name": "_thoigianchinhsua",
				"type": "string"
			},
			{
				"name": "_role",
				"type": "string"
			}
		],
		"name": "insertuserdetail",
		"outputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_Iduser",
				"type": "address"
			},
			{
				"name": "_diachi",
				"type": "string"
			},
			{
				"name": "_thoigianchinhsua",
				"type": "string"
			}
		],
		"name": "updatediachi",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_Iduser",
				"type": "address"
			}
		],
		"name": "isuser",
		"outputs": [
			{
				"name": "isIndeed",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_Iduser",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_username",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_email",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_pass",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_gioitinh",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_ngaysinh",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_sdt",
				"type": "string"
			}
		],
		"name": "Setuser",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_Iduser",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_diachi",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_anhdaidien",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_thoigiantao",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_thoigianchinhsua",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_role",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "Setuserdetail",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_Iduser",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_username",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_email",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_pass",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_gioitinh",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_ngaysinh",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_sdt",
				"type": "string"
			}
		],
		"name": "updateuser",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_Iduser",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_diachi",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_anhdaidien",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_thoigianchinhsua",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_role",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "updateuserdetail",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_Iduser",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "SetLogDeleteuserManagement",
		"type": "event"
	}
]
var userABIss=[
	{
		"constant": false,
		"inputs": [
			{
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "deleteuser",
		"outputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getuserAtIndex",
		"outputs": [
			{
				"name": "Iduser",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getuserCount",
		"outputs": [
			{
				"name": "count",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_Iduser",
				"type": "address"
			}
		],
		"name": "getuser",
		"outputs": [
			{
				"name": "Iduser",
				"type": "address"
			},
			{
				"name": "_username",
				"type": "string"
			},
			{
				"name": "_pass",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_Iduser",
				"type": "address"
			}
		],
		"name": "isuser",
		"outputs": [
			{
				"name": "isIndeed",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_Iduser",
				"type": "address"
			},
			{
				"name": "_username",
				"type": "string"
			},
			{
				"name": "_pass",
				"type": "string"
			}
		],
		"name": "insertuser",
		"outputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_Iduser",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_username",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_pass",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "Setuser",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_Iduser",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_username",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_pass",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "updateuser",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_Iduser",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "SetLogDeleteuserManagement",
		"type": "event"
	}
]