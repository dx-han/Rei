use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn fibonacci_wasm(n: i32) -> i32 {
    if n <= 2 {
        1
    } else {
        fibonacci_wasm(n - 1) + fibonacci_wasm(n - 2)
    }
}

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[test]
fn fib_test() {
    assert_eq!(1, fibonacci_wasm(1));
    assert_eq!(1, fibonacci_wasm(2));
    assert_eq!(2, fibonacci_wasm(3));
    assert_eq!(3, fibonacci_wasm(4));
    assert_eq!(5, fibonacci_wasm(5));
    assert_eq!(8, fibonacci_wasm(6));
}

#[test]
fn add_test() {
    assert_eq!(1 + 1, add(1, 1));
}
