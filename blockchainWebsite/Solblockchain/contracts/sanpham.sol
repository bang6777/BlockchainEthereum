pragma solidity >=0.4.21 <0.6.0;

contract Sanpham {
   //eventInsert
   event Setsanpham(
      address _Idsanpham,
      //address _sanphamId,
      string _Tensanpham,
      string _anh,
      string _thoigiantao,
      string _thoigianchinhsua,
      string _trangthai,
      uint256 _index);
   event Setcaygiong(
      address _Idsanpham,
      //address _CaygiongId,
      string _Khuvuctrongcaygiong,
      string _Nguoitrongcaygiong,
      string _Phanboncaygiong,
      string _Thoivucaygiong,
      string _Soluongcaygiong,
      string _Dientichcaygiong);

       event Setcayantrai(
      address _Idsanpham,
      //address _cayantraiId,
      string _Khuvuctrongcayantrai,
      string _Nguoitrongcayantrai,
      string _Phanboncayantrai,
      string _Thoivucayantrai,
      string _Soluongcayantrai);
    event Setthumua(
      address _Idsanpham,
      //address _thumuaId,
      string _Nguoithumua,
      string _Noithumua,
      string _Cachthucthumua);

      event Setphanphoi(
      address _Idsanpham,
      //address _phanphoiId,
      string _Diadiemnhan,
      string _Noiphanphoi,
      string _Cachthucphanphoi,
      string _Donggoiphanphoi,
      string _Baoquanphanphoi);

     event Setbanle(
      address _Idsanpham,
      //address _banleId,
      string _Nguoibanle,
      string _Noibanle,
      string _Cachthucbanle,
      string _Baoquanbanle);
   //update sanpham
   event updatesanpham(
      address _Idsanpham,
      string _tensanpham,
      string _anh,
      string _thoigianchinhsua,
      string _trangthai,
      uint256 index
   );
    //eventDelete
   event SetLogDeletesanphamManagement(
      address _Idsanpham,
      uint256 index);
   struct sanpham {
      address Idsanpham;
      //address sanphamId;
      string Tensanpham;
      string anh;

      string Khuvuctrongcaygiong;
      string Nguoitrongcaygiong;
      string Phanboncaygiong;
      string Thoivucaygiong;
      string Dientichcaygiong;
      string Soluongcaygiong; 

      string Khuvuctrongcayantrai;
      string Nguoitrongcayantrai;
      string Phanboncayantrai;
      string Thoivucayantrai;
      string Soluongcayantrai; 

      string Nguoithumua;
      string Noithumua;
      string Cachthucthumua;

    
      string Diadiemnhan;
      string Noiphanphoi;
      string Cachthucphanphoi;
      string Donggoiphanphoi;
      string Baoquanphanphoi; 

      string Nguoibanle;
      string Noibanle;
      string Cachthucbanle;
      string Baoquanbanle; 

      string thoigiantao;
      string thoigianchinhsua;
      string trangthai;
      uint256 index;
   }

   mapping(address => sanpham) sanphamStructs;

   address[] sanphamIndex;

   function issanpham(address _Idsanpham) public view returns(bool isIndeed) {
      if(sanphamIndex.length == 0) return false;
      return (sanphamIndex[sanphamStructs[_Idsanpham].index] == _Idsanpham);
   }

   function insertsanpham(
      address _Idsanpham,
      //address _sanphamId,
      string memory _Tensanpham,
      string memory _anh,
      string memory _thoigiantao,
      string memory _thoigianchinhsua,
      string memory _trangthai
      )
      public returns(uint256 index){
      //if(issanpham(_Idsanpham)) revert('throw');
      //sanphamStructs[_Idsanpham].sanphamId = _sanphamId;
      sanphamStructs[_Idsanpham].Tensanpham = _Tensanpham;
      sanphamStructs[_Idsanpham].anh = _anh;
      sanphamStructs[_Idsanpham].thoigiantao = _thoigiantao;
      sanphamStructs[_Idsanpham].thoigianchinhsua = _thoigianchinhsua;
      sanphamStructs[_Idsanpham].trangthai = _trangthai;
      sanphamStructs[_Idsanpham].index = sanphamIndex.push(_Idsanpham)-1;
      emit Setsanpham(_Idsanpham,_Tensanpham, _anh, _thoigiantao, _thoigianchinhsua, _trangthai, sanphamStructs[_Idsanpham].index);
      // emit SetsanphamAdditionEvent(_Idsanpham, _createdTime, _modifiedTime, _idCardNo, _idCardIssuePlace);
      // emit SetsanphamAdditionFlusEvent(
      //    _Idsanpham,
      //    _phoneNumber,
      //    _job,
      //    _sanphamAddr,
      //    sanphamAdditionFlusStructs[_Idsanpham].index);
      return sanphamIndex.length-1;
   }
   function getsanpham(address _Idsanpham) public view returns(
      address Idsanpham,
      //address _sanphamId,
      string memory _Tensanpham,
      string memory _anh,
      string memory _thoigiantao,
      string memory _thoigianchinhsua,
      string memory _trangthai
      ){
      // if(!issanpham(_Idsanpham)) revert('throw');
      return(
         _Idsanpham,
         //sanphamStructs[_Idsanpham].sanphamId,
         sanphamStructs[_Idsanpham].Tensanpham,
         sanphamStructs[_Idsanpham].anh,
         sanphamStructs[_Idsanpham].thoigiantao,
         sanphamStructs[_Idsanpham].thoigianchinhsua,
         sanphamStructs[_Idsanpham].trangthai
         );
   }
   //Delete
    function deletesanpham(address _sanphamAddress) public returns(uint256 index){
      // if(!issanpham(_sanphamAddress)) revert('throw');
      uint256 rowToDelete = sanphamStructs[_sanphamAddress].index;
      address keyToMove = sanphamIndex[sanphamIndex.length-1];
      sanphamIndex[rowToDelete] = keyToMove; //vi tri can delete = vi tri cuoi ds
      sanphamStructs[keyToMove].index = rowToDelete;

      sanphamIndex.length--;
      emit SetLogDeletesanphamManagement(
         _sanphamAddress,
         rowToDelete);

      emit updatesanpham(
         keyToMove,
         //sanphamStructs[keyToMove].sanphamId,
         sanphamStructs[keyToMove].Tensanpham,
         sanphamStructs[keyToMove].anh,
         sanphamStructs[keyToMove].thoigianchinhsua,
         sanphamStructs[keyToMove].trangthai,
         rowToDelete
         );
      return rowToDelete;
   }

   //Ham UPDATE
   function updatetrangthai(address _Idsanpham, string memory _thoigianchinhsua,string memory _trangthai)
   public returns(bool success){
      sanphamStructs[_Idsanpham].thoigianchinhsua = _thoigianchinhsua;
      sanphamStructs[_Idsanpham].trangthai = _trangthai;
      return true;
   }
   //Giai doan cay giong
   function insertCaygiong(
      address _Idsanpham,
      //address _CaygiongId,
      string memory _Khuvuctrongcaygiong,
      string memory _Nguoitrongcaygiong,
      string memory _Phanboncaygiong,
      string memory _Thoivucaygiong,
      string memory _Soluongcaygiong,
      string memory _Dientichcaygiong
      )
      public returns(bool success){
      //if(isCaygiong(_Idsanpham)) revert('throw');
      //sanphamStructs[_Idsanpham].CaygiongId = _CaygiongId;
      sanphamStructs[_Idsanpham].Khuvuctrongcaygiong = _Khuvuctrongcaygiong;
      sanphamStructs[_Idsanpham].Nguoitrongcaygiong = _Nguoitrongcaygiong;
      sanphamStructs[_Idsanpham].Phanboncaygiong = _Phanboncaygiong;
      sanphamStructs[_Idsanpham].Thoivucaygiong = _Thoivucaygiong;
      sanphamStructs[_Idsanpham].Soluongcaygiong = _Soluongcaygiong;
      sanphamStructs[_Idsanpham].Dientichcaygiong = _Dientichcaygiong;
      emit Setcaygiong(_Idsanpham, _Khuvuctrongcaygiong, _Nguoitrongcaygiong, _Phanboncaygiong, _Thoivucaygiong,
      _Soluongcaygiong,_Dientichcaygiong);
      return true;
   }
   function getCaygiong(address _Idsanpham) public view returns(
      address Idsanpham,
      //address _CaygiongId,
      string memory _Khuvuctrongcaygiong,
      string memory _Nguoitrongcaygiong,
      string memory _Phanboncaygiong,
      string memory _Thoivucaygiong,
      string memory _Soluongcaygiong,
      string memory _Dientichcaygiong
      ){
      return(
         _Idsanpham,
         //sanphamStructs[_Idsanpham].CaygiongId,
         sanphamStructs[_Idsanpham].Khuvuctrongcaygiong,
         sanphamStructs[_Idsanpham].Nguoitrongcaygiong,
         sanphamStructs[_Idsanpham].Phanboncaygiong,
         sanphamStructs[_Idsanpham].Thoivucaygiong,
         sanphamStructs[_Idsanpham].Soluongcaygiong,
         sanphamStructs[_Idsanpham].Dientichcaygiong
         );
   }
//end cay giong

//strat giai doan cay an trai
function insertcayantrai(
      address _Idsanpham,
      //address _cayantraiId,
      string memory _Khuvuctrongcayantrai,
      string memory _Nguoitrongcayantrai,
      string memory _Phanboncayantrai,
      string memory _Thoivucayantrai,
      string memory _Soluongcayantrai
      )
      public returns(bool success){
      //if(iscayantrai(_Idsanpham)) revert('throw');
      //sanphamStructs[_Idsanpham].cayantraiId = _cayantraiId;
      sanphamStructs[_Idsanpham].Khuvuctrongcayantrai = _Khuvuctrongcayantrai;
      sanphamStructs[_Idsanpham].Nguoitrongcayantrai = _Nguoitrongcayantrai;
      sanphamStructs[_Idsanpham].Phanboncayantrai = _Phanboncayantrai;
      sanphamStructs[_Idsanpham].Thoivucayantrai = _Thoivucayantrai;
      sanphamStructs[_Idsanpham].Soluongcayantrai = _Soluongcayantrai;
      emit Setcayantrai(_Idsanpham, _Khuvuctrongcayantrai, _Nguoitrongcayantrai, _Phanboncayantrai, _Thoivucayantrai,
      _Soluongcayantrai);
      return true;
   }
   function getcayantrai(address _Idsanpham) public view returns(
      address Idsanpham,
      //address _cayantraiId,
      string memory _Khuvuctrongcayantrai,
      string memory _Nguoitrongcayantrai,
      string memory _Phanboncayantrai,
      string memory _Thoivucayantrai,
      string memory _Soluongcayantrai
      ){
      return(
         _Idsanpham,
         //sanphamStructs[_Idsanpham].cayantraiId,
         sanphamStructs[_Idsanpham].Khuvuctrongcayantrai,
         sanphamStructs[_Idsanpham].Nguoitrongcayantrai,
         sanphamStructs[_Idsanpham].Phanboncayantrai,
         sanphamStructs[_Idsanpham].Thoivucayantrai,
         sanphamStructs[_Idsanpham].Soluongcayantrai
         );
   }
   //end giai doan cay an trai
//Strart thu mua
 function insertthumua(
      address _Idsanpham,
      //address _thumuaId,
      string memory _Nguoithumua,
      string memory _Noithumua,
      string memory _Cachthucthumua
      )
      public returns(bool success){
      //if(isthumua(_Idsanpham)) revert('throw');
      //sanphamStructs[_Idsanpham].thumuaId = _thumuaId;
      sanphamStructs[_Idsanpham].Nguoithumua = _Nguoithumua;
      sanphamStructs[_Idsanpham].Noithumua = _Noithumua;
      sanphamStructs[_Idsanpham].Cachthucthumua = _Cachthucthumua;
      emit Setthumua(_Idsanpham, _Nguoithumua, _Noithumua, _Cachthucthumua);
      return true;
   }
   function getthumua(address _Idsanpham) public view returns(
      address Idsanpham,
      //address _thumuaId,
      string memory _Nguoithumua,
      string memory _Noithumua,
      string memory _Cachthucthumua
      ){
      return(
         _Idsanpham,
         //sanphamStructs[_Idsanpham].thumuaId,
         sanphamStructs[_Idsanpham].Nguoithumua,
         sanphamStructs[_Idsanpham].Noithumua,
         sanphamStructs[_Idsanpham].Cachthucthumua
         );
   }
 //end thu mua
 //start phan phoi
function insertphanphoi(
      address _Idsanpham,
      //address _phanphoiId,
      string memory _Diadiemnhan,
      string memory _Noiphanphoi,
      string memory _Cachthucphanphoi,
      string memory _Donggoiphanphoi,
      string memory _Baoquanphanphoi
      )
      public returns(bool success){
      //if(isphanphoi(_Idsanpham)) revert('throw');
      //sanphamStructs[_Idsanpham].phanphoiId = _phanphoiId;
      sanphamStructs[_Idsanpham].Diadiemnhan = _Diadiemnhan;
      sanphamStructs[_Idsanpham].Noiphanphoi = _Noiphanphoi;
      sanphamStructs[_Idsanpham].Cachthucphanphoi = _Cachthucphanphoi;
      sanphamStructs[_Idsanpham].Donggoiphanphoi = _Donggoiphanphoi;
      sanphamStructs[_Idsanpham].Baoquanphanphoi = _Baoquanphanphoi;
      emit Setphanphoi(_Idsanpham, _Diadiemnhan, _Noiphanphoi, _Cachthucphanphoi, _Donggoiphanphoi,
      _Baoquanphanphoi);
      return true;
   }
   function getphanphoi(address _Idsanpham) public view returns(
      address Idsanpham,
      //address _phanphoiId,
      string memory _Diadiemnhan,
      string memory _Noiphanphoi,
      string memory _Cachthucphanphoi,
      string memory _Donggoiphanphoi,
      string memory _Baoquanphanphoi
      ){
      return(
         _Idsanpham,
         //sanphamStructs[_Idsanpham].phanphoiId,
         sanphamStructs[_Idsanpham].Diadiemnhan,
         sanphamStructs[_Idsanpham].Noiphanphoi,
         sanphamStructs[_Idsanpham].Cachthucphanphoi,
         sanphamStructs[_Idsanpham].Donggoiphanphoi,
         sanphamStructs[_Idsanpham].Baoquanphanphoi
         );
   }
  
 //end phan phoi
 //start ban le
 function insertbanle(
      address _Idsanpham,
      //address _banleId,
      string memory _Nguoibanle,
      string memory _Noibanle,
      string memory _Cachthucbanle,
      string memory _Baoquanbanle
      )
      public returns(bool success){
      //if(isbanle(_Idsanpham)) revert('throw');
      //sanphamStructs[_Idsanpham].banleId = _banleId;
      sanphamStructs[_Idsanpham].Nguoibanle = _Nguoibanle;
      sanphamStructs[_Idsanpham].Noibanle = _Noibanle;
      sanphamStructs[_Idsanpham].Cachthucbanle = _Cachthucbanle;
      sanphamStructs[_Idsanpham].Baoquanbanle = _Baoquanbanle;
      emit Setbanle(_Idsanpham, _Nguoibanle, _Noibanle, _Cachthucbanle,
      _Baoquanbanle);
      return true;
   }
   function getbanle(address _Idsanpham) public view returns(
      address Idsanpham,
      //address _banleId,
      string memory _Nguoibanle,
      string memory _Noibanle,
      string memory _Cachthucbanle,
      string memory _Baoquanbanle
      ){
      return(
         _Idsanpham,
         //sanphamStructs[_Idsanpham].banleId,
         sanphamStructs[_Idsanpham].Nguoibanle,
         sanphamStructs[_Idsanpham].Noibanle,
         sanphamStructs[_Idsanpham].Cachthucbanle,
         sanphamStructs[_Idsanpham].Baoquanbanle
         );
   }

 //end ban le
   function getsanphamCount() public view returns(uint256 count){
         return sanphamIndex.length;
      }

   function getsanphamAtIndex(uint256 _index)
      public
      view
      returns(address Idsanpham)
   {
      return sanphamIndex[_index];
   }

}
