Visitor Pattern is used to perform an action on a structure of elements without changing the implementation of the elements themselves.

Players:

Visitor - This is an interface or an abstract class used to declare the visit operations for all the types of visitable classes. Usually the name of the operation is the same and the operations are differentiated by the method signature: The input object type decides which of the method is called.
ConcreteVisitor - For each type of visitor all the visit methods, declared in abstract visitor, must be implemented. Each Visitor will be responsible for different operations. When a new visitor is defined it has to be passed to the object structure.

Visitable - is an abstraction which declares the accept operation. This is the entry point which enables an object to be "visited" by the visitor object. Each object from a collection should implement this abstraction in order to be able to be visited.
ConcreteVisitable - Those classes implements the Visitable interface or class and defines the accept operation. The visitor object is passed to this object using the accept operation.

ObjectStructure - This is a class containing all the objects that can be visited. It offers a mechanism to iterate through all the elements. This structure is not necessarily a collection. In can be a complex structure, such as a composite object.
