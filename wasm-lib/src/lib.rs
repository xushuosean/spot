use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;
use meilisearch_sdk::{
    indexes::*,
    client::*,
    search::*,
    settings::*
};
use serde::{Serialize, Deserialize};
use std::{io::prelude::*, fs::File};
use futures::executor::block_on;

// lifted from the `console_log` example
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
#[derive(Debug, Serialize, Deserialize)]
pub struct Block {
    id: String,
    label: String,
}
#[derive(Debug, Serialize, Deserialize)]
pub struct Data {
    blocks: Vec<Block>,
}

#[wasm_bindgen]
pub fn getData() -> JsValue {
    let res = Data {
        blocks: vec![
            Block {
                id: '1'.to_string(),
                label: "作战单位1".to_string(),
            },
            Block {
                id: '2'.to_string(),
                label: "作战单位2".to_string(),
            },
            Block {
                id: '3'.to_string(),
                label: "作战单位3".to_string(),
            },
        ],
    };
    JsValue::from_serde(&res).unwrap()
}

#[wasm_bindgen]
#[derive(Debug)]
pub struct Counter {
    key: char,
    count: i32,
}

#[derive(Serialize, Deserialize)]
struct Movie {
  id: String,
  title: String,
  poster: String,
  overview: String,
  release_date: i64,
  genres: Vec<String>
}

#[wasm_bindgen]
impl Counter {
    pub fn default() -> Counter {
        log("Counter::default");
        Self::new('a', 0)
    }
    pub fn new(key: char, count: i32) -> Counter {
        log(&format!("Counter::new({}, {})", key, count));
        Counter {
            key: key,
            count: count,
        }
    }

    pub fn key(&self) -> char {
        log("Counter.key()");
        self.key
    }

    pub fn count(&self) -> i32 {
        log("Counter.count");
        self.count
    }

    pub fn increment(&mut self) {
        log("Counter.increment");
        self.count += 1;
    }

    pub fn update_key(&mut self, key: char) {
        self.key = key;
    }
}