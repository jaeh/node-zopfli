#ifndef _NODE_ZOPFLI_H_
#define _NODE_ZOPFLI_H_
#include <napi.h>
#include <uv.h>
#include <v8.h>
#include "napi.h"
#include "uv.h"

namespace nodezopfli {

class CompressBinding {
 public:
  static Napi::Value Async(const Napi::CallbackInfo& info);
  static Napi::Value Sync(const Napi::CallbackInfo& info);
};

}

#endif
