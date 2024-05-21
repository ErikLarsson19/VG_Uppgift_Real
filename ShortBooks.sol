// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

contract ShortBooks {
  //Struct of variables that makes up a book.
  struct Book{
    uint id;
    string title;
    string description;
    string content;
    string imageUrl;
  }

  Book[] public books;
//Constructor that pushes three "books" to the Books[] public books.
  constructor(){
    books.push(Book(
      0,
      "Bunny's Cozy House",
      "A short story about a Bunny and its Cozy House",
      "There once was a Bunny, it lived in a Cozy House. Once a month the entire family comes to visit. Bunny was excited for the family to visit....",
      "https://ipfs.io/ipfs/QmQcaDFxaNRQGhAdCu7ZNXNxKQS1d1WzPDEp9nt3nHASGr"
    ));
    books.push(Book(
      1,
      "The Enchanted Garden",
      "A short story a bought a magical and Enchanted Garden",
      "Ron heard a sound coming from underneath his bed. It sounded like birds chirping. He crawled under the bed and found a portal, it led to an Enchanted Garden..... ",
      "https://ipfs.io/ipfs/QmSTiKx966p5vAAaZKJNzmq6DcHWbQzfDL6fQzztBa8QSx"
    ));
    books.push(Book(
      2,
      "Whispering Forest",
      "A short story about a Whispering Forest",
      "All the monsters and goblins and things lived in the Whispering Forest, it was constantly whispering stuff",
      "https://ipfs.io/ipfs/QmYtJasAtcW33QPigfTsfdo14Viz9NGezh7SwuSrT5iPsn"
    ));
  }
//This function returns a specified book
  function getBook(uint _id) public view returns (Book memory){
    require(_id < books.length, "Book does not exist");
    return books[_id];
  }
//This function return the title of a specified book
 function getBookTitle(uint _id) public view returns (string memory) {
      require(_id < books.length, "Book does not exist");
      return books[_id].title;
  }
//This function returns the description of a specified book
  function getBookDescription(uint _id) public view returns (string memory) {
      require(_id < books.length, "Book does not exist");
      return books[_id].description;
  }
//This function returns the content of a specified book
  function getBookContent(uint _id) public view returns (string memory) {
      require(_id < books.length, "Book does not exist");
      return books[_id].content;
  }
//This function takes a uint id and returns the matching books imageURL
  function getBookCover(uint _id) public view returns (string memory){
    require(_id < books.length, "Book does not exist");
    return books[_id].imageUrl;
  }
}