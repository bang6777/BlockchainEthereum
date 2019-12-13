pragma solidity >=0.4.21 <0.6.0;

contract User {
   //eventInsert
   event Setuser(
      address _Iduser,
      //address _userId,
      string _username,
      string _email,
      string _pass,
      string _gioitinh,
      string _ngaysinh,
      string _sdt);
   event Setuserdetail(
      address _Iduser,
      string _diachi,
      string _anhdaidien,
      string _thoigiantao,
      string _thoigianchinhsua,
      string _role,
      uint256 _index
   );
   //update cay giong
   event updateuser(
      address _Iduser,
      string _username,
      string _email,
      string _pass,
      string _gioitinh,
      string _ngaysinh,
      string _sdt
   );
   event updateuserdetail(
      address _Iduser,
      string _diachi,
      string _anhdaidien,
      string _thoigianchinhsua,
      string _role,
      uint256 index
   );
    //eventDelete
   event SetLogDeleteuserManagement(
      address _Iduser,
      uint256 index);
   struct user {
      address Iduser;
      //address userId;
      string username;
      string email;
      string pass;
      string gioitinh;
      string ngaysinh;
      string sdt;
      string diachi;
      string anhdaidien;
      string thoigiantao;
      string thoigianchinhsua;
      string role;
      uint256 index;
   }

   mapping(address => user) userStructs;

   address[] userIndex;

   function isuser(address _Iduser) public view returns(bool isIndeed) {
      if(userIndex.length == 0) return false;
      return (userIndex[userStructs[_Iduser].index] == _Iduser);
   }

   function insertuser(
      address _Iduser,
      //address _userId,
      string memory _username,
      string memory _email,
      string memory _pass,
      string memory _gioitinh,
      string memory _ngaysinh,
      string memory _sdt
      )
      public returns(uint256 index){
      //if(isuser(_Iduser)) revert('throw');
      //userStructs[_Iduser].userId = _userId;
      userStructs[_Iduser].username = _username;
      userStructs[_Iduser].email = _email;
      userStructs[_Iduser].pass = _pass;
      userStructs[_Iduser].gioitinh = _gioitinh;
      userStructs[_Iduser].ngaysinh = _ngaysinh;
      emit Setuser(_Iduser,_username, _email, _pass, _gioitinh, _ngaysinh,_sdt);
      // emit SetuserAdditionEvent(_Iduser, _createdTime, _modifiedTime, _idCardNo, _idCardIssuePlace);
      // emit SetuserAdditionFlusEvent(
      //    _Iduser,
      //    _phoneNumber,
      //    _job,
      //    _userAddr,
      //    userAdditionFlusStructs[_Iduser].index);
      return userIndex.length-1;
   }
   function insertuserdetail(
      address _Iduser,
      string memory _diachi,
      string memory _anhdaidien,
      string memory _thoigiantao,
      string memory _thoigianchinhsua,
      string memory _role
   ) public returns(uint256 index){
      userStructs[_Iduser].diachi = _diachi;
      userStructs[_Iduser].anhdaidien = _anhdaidien;
      userStructs[_Iduser].thoigiantao = _thoigiantao;
      userStructs[_Iduser].thoigianchinhsua = _thoigianchinhsua;
      userStructs[_Iduser].role = _role;
      userStructs[_Iduser].index = userIndex.push(_Iduser)-1;

      emit Setuserdetail(_Iduser, _diachi, _anhdaidien, _thoigiantao, _thoigianchinhsua, _role, userStructs[_Iduser].index);
      return userIndex.length-1;
   }
   function getuser(address _Iduser) public view returns(
      address Iduser,
      //address _userId,
      string memory _username,
      string memory _email,
      string memory _pass,
      string memory _gioitinh,
      string memory _ngaysinh,
      string memory _sdt
      ){
      // if(!isuser(_Iduser)) revert('throw');
      return(
         _Iduser,
         //userStructs[_Iduser].userId,
         userStructs[_Iduser].username,
         userStructs[_Iduser].email,
         userStructs[_Iduser].pass,
         userStructs[_Iduser].gioitinh,
         userStructs[_Iduser].ngaysinh,
         userStructs[_Iduser].sdt
         );
   }
   function getuserdetail(address _Iduser) public view returns(
      address Iduser,
      string memory _diachi,
      string memory _anhdaidien,
      string memory _thoigiantao,
      string memory _thoigianchinhsua,
      string memory _role
   ) {
      return( _Iduser,
            userStructs[_Iduser].diachi,
            userStructs[_Iduser].anhdaidien,
            userStructs[_Iduser].thoigiantao,
            userStructs[_Iduser].thoigianchinhsua,
            userStructs[_Iduser].role
      );
   }
   //Delete
    function deleteuser(address _userAddress) public returns(uint256 index){
      // if(!isuser(_userAddress)) revert('throw');
      uint256 rowToDelete = userStructs[_userAddress].index;
      address keyToMove = userIndex[userIndex.length-1];
      userIndex[rowToDelete] = keyToMove; //vi tri can delete = vi tri cuoi ds
      userStructs[keyToMove].index = rowToDelete;

      userIndex.length--;
      emit SetLogDeleteuserManagement(
         _userAddress,
         rowToDelete);

      emit updateuser(
         keyToMove,
         //userStructs[keyToMove].userId,
         userStructs[keyToMove].username,
         userStructs[keyToMove].email,
         userStructs[keyToMove].pass,
         userStructs[keyToMove].gioitinh,
         userStructs[keyToMove].ngaysinh,
         userStructs[keyToMove].sdt
         );
      emit updateuserdetail(
         keyToMove,
         userStructs[keyToMove].diachi,
         userStructs[keyToMove].anhdaidien,
         userStructs[keyToMove].thoigianchinhsua,
         userStructs[keyToMove].role,
         rowToDelete);
      return rowToDelete;
   }

   //Ham UPDATE
   function updateusername(address _Iduser, string memory _username,string memory _thoigianchinhsua)
   public returns(bool success){
      userStructs[_Iduser].username = _username;
      userStructs[_Iduser].thoigianchinhsua = _thoigianchinhsua;
      return true;
   }
   function updateemail(address _Iduser, string memory _email, string memory _thoigianchinhsua)
   public returns(bool success){
      userStructs[_Iduser].email = _email;
      userStructs[_Iduser].thoigianchinhsua = _thoigianchinhsua;
      return true;
   }

   function updatepass(address _Iduser,string memory _pass, string memory _thoigianchinhsua)
   public returns(bool success){
      userStructs[_Iduser].pass = _pass;
      userStructs[_Iduser].thoigianchinhsua = _thoigianchinhsua;
      return true;
   }
   function updategioitinh(address _Iduser, string memory _gioitinh, string memory _thoigianchinhsua)
   public returns(bool success){
      userStructs[_Iduser].gioitinh = _gioitinh;
      userStructs[_Iduser].thoigianchinhsua = _thoigianchinhsua;
      return true;
   }
   function updateanhdaidien(address _Iduser, string memory _anhdaidien, string memory _thoigianchinhsua)
   public returns(bool success){
      userStructs[_Iduser].anhdaidien = _anhdaidien;
      userStructs[_Iduser].thoigianchinhsua = _thoigianchinhsua;
      return true;
   }
   function updatediachi(address _Iduser, string memory _diachi, string memory _thoigianchinhsua)
   public returns(bool success){
      userStructs[_Iduser].diachi = _diachi;
      userStructs[_Iduser].thoigianchinhsua = _thoigianchinhsua;
      return true;
   }
   function updatesdt(address _Iduser, string memory _sdt, string memory _thoigianchinhsua)
   public returns(bool success){
      userStructs[_Iduser].sdt = _sdt;
      userStructs[_Iduser].thoigianchinhsua = _thoigianchinhsua;
      return true;
   }
   function updaterole(address _Iduser, string memory _role, string memory _thoigianchinhsua)
   public returns(bool success){
      userStructs[_Iduser].role = _role;
      userStructs[_Iduser].thoigianchinhsua = _thoigianchinhsua;
      return true;
   }
   function getuserCount() public view returns(uint256 count){
         return userIndex.length;
      }

   function getuserAtIndex(uint256 _index)
      public
      view
      returns(address Iduser)
   {
      return userIndex[_index];
   }

}