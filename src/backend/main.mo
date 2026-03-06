import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";

actor {
  type Message = {
    name : Text;
    email : Text;
    text : Text;
  };

  module Message {
    public func compare(message1 : Message, message2 : Message) : Order.Order {
      switch (Text.compare(message1.name, message2.name)) {
        case (#equal) { Text.compare(message1.email, message2.email) };
        case (order) { order };
      };
    };
  };

  let messages = Map.empty<Nat, Message>();
  var nextId = 0;

  public shared ({ caller }) func sendMessage(name : Text, email : Text, text : Text) : async () {
    let message : Message = { name; email; text };
    messages.add(nextId, message);
    nextId += 1;
  };

  public query ({ caller }) func getAllMessages() : async [Message] {
    messages.values().toArray().sort();
  };

  public shared ({ caller }) func deleteMessage(id : Nat) : async () {
    if (messages.containsKey(id)) {
      messages.remove(id);
    } else {
      Runtime.trap("Message does not exist");
    };
  };
};
