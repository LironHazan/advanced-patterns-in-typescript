#Dependency Injection:

- Do it yourself.
- Using InversifyJS.
 
 Description: When one object supplies the dependencies of another object.
 
 requirements:
 - Had to install: 'reflect-metadata'.
 - Have to decorate our injectables so they'll emit meta data.
 - In tsconfig enable "Experimental Options":
 
      `"experimentalDecorators": true,        
      "emitDecoratorMetadata": true`

Related [Blog post](https://medium.com/@Sentinelone_tech/dependency-injection-in-typescript-from-scratch-d1a4422043a0) was published to the sentinelOne tech publication
