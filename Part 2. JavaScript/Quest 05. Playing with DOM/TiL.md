# Quest 5. Playing with DOM

## Topics

### DOM API

  * document 객체
  * document.getElementById(), document.querySelector(), document.querySelectorAll() 함수들
  * 기타 DOM 조작을 위한 함수와 속성들

### 실행 컨텍스트와 Closure

#### 실행 컨텍스트

콜 스택(call stack)은 함수를 호출할 때 해당 함수의 호출정보가 차곡차곡 쌓여있는 스택을 의미한다. 함수가 호출될 때 마다 해당 함수의 호출 정보가 기존 함수의 호출 정보 위에 스택 형태로 하나씩 쌓인다. 이는 고급 프로그래밍 언어에서 흔희 사용하는 방식이고, 자바 스크립트 또한 이런 관점에서 함수 호출 시 콜스택에 호출 정보가 쌓이게 된다. 

이 관점에서 실행 컨텍스트란 실행 가능한 코드를 형상화하고 구분하는 추상적인 개념으로, 실행 가능한 자바스크립트 코드 블럭이 실행되는 환경이다.

자바스크립트 내에서 실행 컨텍스트가 형성되는 경우는 전역 코드, eval()로 실행되는 코드, 함수 안의 코드를 실행하는 경우이며, 대부분의 프로그래머는 함수로 실행 컨텍스트를 만든다.

ECMAScript에서는 "현재 실행되는 컨텍스트에서 이 컨텍스트와 관련 없는 실행 코드가 실행되면, 새로운 컨텍스트가 생성되어 스택에 들어가고 제어권이 그 컨텍스트로 이동한다." 라고 설명되어 있다.

##### 1. 실행 컨텍스트의 생성 과정

* 활성 객체와 변수 객체
* 스코프 체인

###### 1) 활성 객체 생성

실행 컨텍스트가 생성되면 JS 엔진은 해당 컨텍스트에서 실행에 필요한 여러 가지 정보를 담을 객체를 생성하는데 이를 활성 객체라고 한다. 이 객체에 매개변수나 사용자가 정의한 변수 및 객체를 저장하고, 새로 만들어진 컨텍스트로 접근 가능하게 되어 있다.

###### 2) arguments 객체 생성

만들어진 활성 객체는 arguments 프로퍼티로 arguments 객체를 참조한다.

###### 3) scope 정보 생성

현재 컨텍스트의 유효 범위를 나타내는 스코프 정보를 생성한다. 스코프 정보는 현재 실행중인 실행 컨텍스트 안에서 연결 리스트와 유사한 형식으로 만들어진다. 현재 컨텍스트에서 특정 변수로 접근 할 경우 이 리스트를 활용한다. 이를 통해 현재 스코프 뿐만 아니라 상위 스코프의 변수에도 접근 할 수 있다.

이 리스트를 **스코프체인**이라 하며, [[scope]] 프로퍼티로 참조된다.

###### 4) 변수 생성

이후 현재 실행 컨텍스트 내부에서 사용되는 지역 변수의 생성이 이루어진다. ECMAScript 에서는 생성되는 변수를 저장하는 변수 객체를 언급하는데, 앞서 생성된 활성 객체가 변수 객체로 사용된다.

변수 객체 안에서 호출된 함수 인자는 각각의 프로퍼티가 만들어지고, 그 값이 할당된다. 값이 넘겨지지 않으면 그 값은 undefined가 할당된다.

그러나 이 과정에서는 변수나 내부함수를 메모리에 생성하고 초기화는 각 변수나 함수에 해당하는 표현식이 실행되기 전까지 이루어지지 않는다. 표현식의 실행은 변수 객체 생성이 다 이루어진 후 시작된다.

###### 5) this 바인딩

마지막 단계에서는 this 키워드를 사용하는 값이 할당된다. this가 참고할 객체가 없으면 전역 객체를 참고한다.

###### 6) 코드의 실행

하나의 실행 컨텍스트가 생성되고, 변수 객체가 만들어진 후, 코드에 있는 여러 가지 표현식 실행이 이루어진다. 이렇게 실행되며 변수의 초기화 및 연산, 다른 함수의 실행등이 이루어진다.

전역 실행 컨텍스트는 일반 실행 컨텍스트와 약간 다른데, arguments 객체가 없으며, 전역 객체 하나만을 포함하는 스코프 체인이 있다. 전역 실행 컨텍스트는 변수 객체가 곧 전역 객체이다.

#### 스코프 체인

스코프는 함수를 선언할 때 생긴다. 함수를 처음 선언하는 순간, 함수 내부의 변수는 자기 스코프로부터 가장 가까운 곳(상위 범위)에서 변수를 참조하게 된다.

스코프, 유효 범위. 유효 범위 안에서 함수와 변수가 존재한다. 다른 언어와 다르게 함수는 function 단위 스코프로 존재하며, var를 사용할 경우 if, for 문에서 중괄호는 scope에 포함이 되지 않는다. 이는 개발시 오류로 직결될 수 있다. 그래서 es6 이후 let과 const 가 나타난 후, block scope의 범위내에서 변수를 사용할 수 있게 되었다.

자바스크립트에서는, 유효 범위(스코프의 유효범위)를 나타내는 스코프가 [[scope]] 프로퍼티로 각 함수 객체 내 연결리스트 형식으로 관리되며, 이를 스코프 체인이라고 한다. 스코프 체인은 각 실행 컨텍스트의 변수 객체가 구성 요소인 리스트와 같다.

각각의 함수는 [[scope]] 프로퍼티로 자신이 생성된 실행 컨텍스트의 스코프 체인을 참조하며, 함수가 실행될 때 실행 컨텍스트가 만들어지고, 이 실행 컨텍스트는 실행된 함수의 [[scope]] 프로퍼티를 기반으로 새로운 스코프 체인을 만든다.

##### Hoisting

```js
foo();
bar();

var foo = function(){
  console.log("foo and x = " +x);
};

function bar(){
  console.log("bar and x = " + x);
}

var x = 1;
```

이것은

```js
var foo;

function bar(){
  console.log("bar and x = " + x);
}

var x;

foo(); // type error
bar(); // bar and x = undefined

foo = function(){
  console.log("foo and x  = " + x);
};

x = 1;
```

#### 클로저

이미 생명 주기가 끝난 외부 함수의 변수를 참조하는 함수를 클로저라 한다.

클로저는 은닉화 및 캡슐화로 활용 할 수 있다. 또는 전역 namespace 사용을 방지하기 위해 활용되기도 한다.

```js
function outerFunc(){
  var x = 10;
  var innerFunc = function(){ console.log(x); }
  return innerFunc;
}

var inner = outerFunc();
inner(); // 10
```

클로저의 경우 성능 문제를 야기 시킬 가능성이 있기에, 충분한 고려와 사이드 이펙트를 고려하여 함수를 작성하여야 한다.

#### 쓰로틀링과 디바운싱

## CheckList

* JS를 통해 DOM 객체에 CSS Class를 주거나 없애려면 어떻게 해야 하나요?
  
  ```
  DOM API인 classList를 사용하여 add 또는 remove 메서드를 이용하여 작업을 합니다.
  ```

  * IE9나 그 이전의 옛날 브라우저들에서는 어떻게 해야 하나요?

  ```
  DOM객체에 className property로 접근하여 직접 이름을 입력하는 작업을 수행합니다.
  ```

* 자바스크립트의 변수가 유효한 범위는 어떻게 결정되나요?
  * var과 let으로 변수를 정의하는 방법들은 어떻게 다르게 동작하나요?
  ```
  자바스크립트의 변수가 유효한 범위는 function 또는 block이다.
  기존 자바스크립트의 경우 var로 변수를 정의하여 사용하였기에 function scope로 사용되었지만, es6 이후에 const와 let이 사용되면서 block scope로 변수의 범위를 제한 시킬 수 있다.
  ```
