(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/animations'), require('@angular/cdk/coercion'), require('@angular/core'), require('@angular/forms'), require('@ng-tangram/animate/fading'), require('@ng-tangram/components/forms'), require('@ng-tangram/components/modal'), require('@ng-tangram/components/upload'), require('rxjs/operators'), require('rxjs/Subject'), require('@angular/common'), require('@ng-tangram/components/icon'), require('@ng-tangram/components/progress')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/animations', '@angular/cdk/coercion', '@angular/core', '@angular/forms', '@ng-tangram/animate/fading', '@ng-tangram/components/forms', '@ng-tangram/components/modal', '@ng-tangram/components/upload', 'rxjs/operators', 'rxjs/Subject', '@angular/common', '@ng-tangram/components/icon', '@ng-tangram/components/progress'], factory) :
    (factory((global.nt = global.nt || {}, global.nt.components = global.nt.components || {}, global.nt.components.picture = {}),global.ng.animations,global.ng.cdk.coercion,global.ng.core,global.ng.forms,global.nt.animate.fading,global.nt.components.forms,global.nt.components.modal,global.nt.components.upload,global.Rx.operators,global.Rx.Subject,global.ng.common,global.nt.components.icon,global.nt.components.progress));
}(this, (function (exports,animations,coercion,core,forms,fading,forms$1,modal,upload,operators,Subject,common,icon,progress) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [0, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var loadImage = createCommonjsModule(function (module) {
    (function ($) {

      // Loads an image for a given File object.
      // Invokes the callback with an img or optional canvas
      // element (if supported by the browser) as parameter:
      function loadImage (file, callback, options) {
        var img = document.createElement('img');
        var url;
        img.onerror = function (event) {
          return loadImage.onerror(img, event, file, callback, options)
        };
        img.onload = function (event) {
          return loadImage.onload(img, event, file, callback, options)
        };
        if (typeof file === 'string') {
          loadImage.fetchBlob(
            file,
            function (blob) {
              if (blob) {
                file = blob;
                url = loadImage.createObjectURL(file);
              } else {
                url = file;
                if (options && options.crossOrigin) {
                  img.crossOrigin = options.crossOrigin;
                }
              }
              img.src = url;
            },
            options
          );
          return img
        } else if (
          loadImage.isInstanceOf('Blob', file) ||
          // Files are also Blob instances, but some browsers
          // (Firefox 3.6) support the File API but not Blobs:
          loadImage.isInstanceOf('File', file)
        ) {
          url = img._objectURL = loadImage.createObjectURL(file);
          if (url) {
            img.src = url;
            return img
          }
          return loadImage.readFile(file, function (e) {
            var target = e.target;
            if (target && target.result) {
              img.src = target.result;
            } else if (callback) {
              callback(e);
            }
          })
        }
      }
      // The check for URL.revokeObjectURL fixes an issue with Opera 12,
      // which provides URL.createObjectURL but doesn't properly implement it:
      var urlAPI =
        ($.createObjectURL && $) ||
        ($.URL && URL.revokeObjectURL && URL) ||
        ($.webkitURL && webkitURL);

      function revokeHelper (img, options) {
        if (img._objectURL && !(options && options.noRevoke)) {
          loadImage.revokeObjectURL(img._objectURL);
          delete img._objectURL;
        }
      }

      // If the callback given to this function returns a blob, it is used as image
      // source instead of the original url and overrides the file argument used in
      // the onload and onerror event callbacks:
      loadImage.fetchBlob = function (url, callback, options) {
        callback();
      };

      loadImage.isInstanceOf = function (type, obj) {
        // Cross-frame instanceof check
        return Object.prototype.toString.call(obj) === '[object ' + type + ']'
      };

      loadImage.transform = function (img, options, callback, file, data) {
        callback(img, data);
      };

      loadImage.onerror = function (img, event, file, callback, options) {
        revokeHelper(img, options);
        if (callback) {
          callback.call(img, event);
        }
      };

      loadImage.onload = function (img, event, file, callback, options) {
        revokeHelper(img, options);
        if (callback) {
          loadImage.transform(img, options, callback, file, {});
        }
      };

      loadImage.createObjectURL = function (file) {
        return urlAPI ? urlAPI.createObjectURL(file) : false
      };

      loadImage.revokeObjectURL = function (url) {
        return urlAPI ? urlAPI.revokeObjectURL(url) : false
      };

      // Loads a given File object via FileReader interface,
      // invokes the callback with the event object (load or error).
      // The result can be read via event.target.result:
      loadImage.readFile = function (file, callback, method) {
        if ($.FileReader) {
          var fileReader = new FileReader();
          fileReader.onload = fileReader.onerror = callback;
          method = method || 'readAsDataURL';
          if (fileReader[method]) {
            fileReader[method](file);
            return fileReader
          }
        }
        return false
      };

      if (typeof undefined === 'function' && undefined.amd) {
        undefined(function () {
          return loadImage
        });
      } else if ('object' === 'object' && module.exports) {
        module.exports = loadImage;
      } else {
        $.loadImage = loadImage;
      }
    })((typeof window !== 'undefined' && window) || commonjsGlobal);
    });

    var loadImageScale = createCommonjsModule(function (module) {
    (function (factory) {
      if (typeof undefined === 'function' && undefined.amd) {
        // Register as an anonymous AMD module:
        undefined(['./load-image'], factory);
      } else if ('object' === 'object' && module.exports) {
        factory(loadImage);
      } else {
        // Browser globals:
        factory(window.loadImage);
      }
    })(function (loadImage$$1) {

      var originalTransform = loadImage$$1.transform;

      loadImage$$1.transform = function (img, options, callback, file, data) {
        originalTransform.call(
          loadImage$$1,
          loadImage$$1.scale(img, options, data),
          options,
          callback,
          file,
          data
        );
      };

      // Transform image coordinates, allows to override e.g.
      // the canvas orientation based on the orientation option,
      // gets canvas, options passed as arguments:
      loadImage$$1.transformCoordinates = function () {};

      // Returns transformed options, allows to override e.g.
      // maxWidth, maxHeight and crop options based on the aspectRatio.
      // gets img, options passed as arguments:
      loadImage$$1.getTransformedOptions = function (img, options) {
        var aspectRatio = options.aspectRatio;
        var newOptions;
        var i;
        var width;
        var height;
        if (!aspectRatio) {
          return options
        }
        newOptions = {};
        for (i in options) {
          if (options.hasOwnProperty(i)) {
            newOptions[i] = options[i];
          }
        }
        newOptions.crop = true;
        width = img.naturalWidth || img.width;
        height = img.naturalHeight || img.height;
        if (width / height > aspectRatio) {
          newOptions.maxWidth = height * aspectRatio;
          newOptions.maxHeight = height;
        } else {
          newOptions.maxWidth = width;
          newOptions.maxHeight = width / aspectRatio;
        }
        return newOptions
      };

      // Canvas render method, allows to implement a different rendering algorithm:
      loadImage$$1.renderImageToCanvas = function (
        canvas,
        img,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        destX,
        destY,
        destWidth,
        destHeight
      ) {
        canvas
          .getContext('2d')
          .drawImage(
            img,
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight,
            destX,
            destY,
            destWidth,
            destHeight
          );
        return canvas
      };

      // Determines if the target image should be a canvas element:
      loadImage$$1.hasCanvasOption = function (options) {
        return options.canvas || options.crop || !!options.aspectRatio
      };

      // Scales and/or crops the given image (img or canvas HTML element)
      // using the given options.
      // Returns a canvas object if the browser supports canvas
      // and the hasCanvasOption method returns true or a canvas
      // object is passed as image, else the scaled image:
      loadImage$$1.scale = function (img, options, data) {
        options = options || {};
        var canvas = document.createElement('canvas');
        var useCanvas =
          img.getContext ||
          (loadImage$$1.hasCanvasOption(options) && canvas.getContext);
        var width = img.naturalWidth || img.width;
        var height = img.naturalHeight || img.height;
        var destWidth = width;
        var destHeight = height;
        var maxWidth;
        var maxHeight;
        var minWidth;
        var minHeight;
        var sourceWidth;
        var sourceHeight;
        var sourceX;
        var sourceY;
        var pixelRatio;
        var downsamplingRatio;
        var tmp;
        function scaleUp () {
          var scale = Math.max(
            (minWidth || destWidth) / destWidth,
            (minHeight || destHeight) / destHeight
          );
          if (scale > 1) {
            destWidth *= scale;
            destHeight *= scale;
          }
        }
        function scaleDown () {
          var scale = Math.min(
            (maxWidth || destWidth) / destWidth,
            (maxHeight || destHeight) / destHeight
          );
          if (scale < 1) {
            destWidth *= scale;
            destHeight *= scale;
          }
        }
        if (useCanvas) {
          options = loadImage$$1.getTransformedOptions(img, options, data);
          sourceX = options.left || 0;
          sourceY = options.top || 0;
          if (options.sourceWidth) {
            sourceWidth = options.sourceWidth;
            if (options.right !== undefined && options.left === undefined) {
              sourceX = width - sourceWidth - options.right;
            }
          } else {
            sourceWidth = width - sourceX - (options.right || 0);
          }
          if (options.sourceHeight) {
            sourceHeight = options.sourceHeight;
            if (options.bottom !== undefined && options.top === undefined) {
              sourceY = height - sourceHeight - options.bottom;
            }
          } else {
            sourceHeight = height - sourceY - (options.bottom || 0);
          }
          destWidth = sourceWidth;
          destHeight = sourceHeight;
        }
        maxWidth = options.maxWidth;
        maxHeight = options.maxHeight;
        minWidth = options.minWidth;
        minHeight = options.minHeight;
        if (useCanvas && maxWidth && maxHeight && options.crop) {
          destWidth = maxWidth;
          destHeight = maxHeight;
          tmp = sourceWidth / sourceHeight - maxWidth / maxHeight;
          if (tmp < 0) {
            sourceHeight = maxHeight * sourceWidth / maxWidth;
            if (options.top === undefined && options.bottom === undefined) {
              sourceY = (height - sourceHeight) / 2;
            }
          } else if (tmp > 0) {
            sourceWidth = maxWidth * sourceHeight / maxHeight;
            if (options.left === undefined && options.right === undefined) {
              sourceX = (width - sourceWidth) / 2;
            }
          }
        } else {
          if (options.contain || options.cover) {
            minWidth = maxWidth = maxWidth || minWidth;
            minHeight = maxHeight = maxHeight || minHeight;
          }
          if (options.cover) {
            scaleDown();
            scaleUp();
          } else {
            scaleUp();
            scaleDown();
          }
        }
        if (useCanvas) {
          pixelRatio = options.pixelRatio;
          if (pixelRatio > 1) {
            canvas.style.width = destWidth + 'px';
            canvas.style.height = destHeight + 'px';
            destWidth *= pixelRatio;
            destHeight *= pixelRatio;
            canvas.getContext('2d').scale(pixelRatio, pixelRatio);
          }
          downsamplingRatio = options.downsamplingRatio;
          if (
            downsamplingRatio > 0 &&
            downsamplingRatio < 1 &&
            destWidth < sourceWidth &&
            destHeight < sourceHeight
          ) {
            while (sourceWidth * downsamplingRatio > destWidth) {
              canvas.width = sourceWidth * downsamplingRatio;
              canvas.height = sourceHeight * downsamplingRatio;
              loadImage$$1.renderImageToCanvas(
                canvas,
                img,
                sourceX,
                sourceY,
                sourceWidth,
                sourceHeight,
                0,
                0,
                canvas.width,
                canvas.height
              );
              sourceX = 0;
              sourceY = 0;
              sourceWidth = canvas.width;
              sourceHeight = canvas.height;
              img = document.createElement('canvas');
              img.width = sourceWidth;
              img.height = sourceHeight;
              loadImage$$1.renderImageToCanvas(
                img,
                canvas,
                0,
                0,
                sourceWidth,
                sourceHeight,
                0,
                0,
                sourceWidth,
                sourceHeight
              );
            }
          }
          canvas.width = destWidth;
          canvas.height = destHeight;
          loadImage$$1.transformCoordinates(canvas, options);
          return loadImage$$1.renderImageToCanvas(
            canvas,
            img,
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight,
            0,
            0,
            destWidth,
            destHeight
          )
        }
        img.width = destWidth;
        img.height = destHeight;
        return img
      };
    });
    });

    var loadImageMeta = createCommonjsModule(function (module) {
    (function (factory) {
      if (typeof undefined === 'function' && undefined.amd) {
        // Register as an anonymous AMD module:
        undefined(['./load-image'], factory);
      } else if ('object' === 'object' && module.exports) {
        factory(loadImage);
      } else {
        // Browser globals:
        factory(window.loadImage);
      }
    })(function (loadImage$$1) {

      var hasblobSlice =
        typeof Blob !== 'undefined' &&
        (Blob.prototype.slice ||
          Blob.prototype.webkitSlice ||
          Blob.prototype.mozSlice);

      loadImage$$1.blobSlice =
        hasblobSlice &&
        function () {
          var slice = this.slice || this.webkitSlice || this.mozSlice;
          return slice.apply(this, arguments)
        };

      loadImage$$1.metaDataParsers = {
        jpeg: {
          0xffe1: [] // APP1 marker
        }
      };

      // Parses image meta data and calls the callback with an object argument
      // with the following properties:
      // * imageHead: The complete image head as ArrayBuffer (Uint8Array for IE10)
      // The options arguments accepts an object and supports the following properties:
      // * maxMetaDataSize: Defines the maximum number of bytes to parse.
      // * disableImageHead: Disables creating the imageHead property.
      loadImage$$1.parseMetaData = function (file, callback, options, data) {
        options = options || {};
        data = data || {};
        var that = this;
        // 256 KiB should contain all EXIF/ICC/IPTC segments:
        var maxMetaDataSize = options.maxMetaDataSize || 262144;
        var noMetaData = !(
          typeof DataView !== 'undefined' &&
          file &&
          file.size >= 12 &&
          file.type === 'image/jpeg' &&
          loadImage$$1.blobSlice
        );
        if (
          noMetaData ||
          !loadImage$$1.readFile(
            loadImage$$1.blobSlice.call(file, 0, maxMetaDataSize),
            function (e) {
              if (e.target.error) {
                // FileReader error
                console.log(e.target.error);
                callback(data);
                return
              }
              // Note on endianness:
              // Since the marker and length bytes in JPEG files are always
              // stored in big endian order, we can leave the endian parameter
              // of the DataView methods undefined, defaulting to big endian.
              var buffer = e.target.result;
              var dataView = new DataView(buffer);
              var offset = 2;
              var maxOffset = dataView.byteLength - 4;
              var headLength = offset;
              var markerBytes;
              var markerLength;
              var parsers;
              var i;
              // Check for the JPEG marker (0xffd8):
              if (dataView.getUint16(0) === 0xffd8) {
                while (offset < maxOffset) {
                  markerBytes = dataView.getUint16(offset);
                  // Search for APPn (0xffeN) and COM (0xfffe) markers,
                  // which contain application-specific meta-data like
                  // Exif, ICC and IPTC data and text comments:
                  if (
                    (markerBytes >= 0xffe0 && markerBytes <= 0xffef) ||
                    markerBytes === 0xfffe
                  ) {
                    // The marker bytes (2) are always followed by
                    // the length bytes (2), indicating the length of the
                    // marker segment, which includes the length bytes,
                    // but not the marker bytes, so we add 2:
                    markerLength = dataView.getUint16(offset + 2) + 2;
                    if (offset + markerLength > dataView.byteLength) {
                      console.log('Invalid meta data: Invalid segment size.');
                      break
                    }
                    parsers = loadImage$$1.metaDataParsers.jpeg[markerBytes];
                    if (parsers) {
                      for (i = 0; i < parsers.length; i += 1) {
                        parsers[i].call(
                          that,
                          dataView,
                          offset,
                          markerLength,
                          data,
                          options
                        );
                      }
                    }
                    offset += markerLength;
                    headLength = offset;
                  } else {
                    // Not an APPn or COM marker, probably safe to
                    // assume that this is the end of the meta data
                    break
                  }
                }
                // Meta length must be longer than JPEG marker (2)
                // plus APPn marker (2), followed by length bytes (2):
                if (!options.disableImageHead && headLength > 6) {
                  if (buffer.slice) {
                    data.imageHead = buffer.slice(0, headLength);
                  } else {
                    // Workaround for IE10, which does not yet
                    // support ArrayBuffer.slice:
                    data.imageHead = new Uint8Array(buffer).subarray(0, headLength);
                  }
                }
              } else {
                console.log('Invalid JPEG file: Missing JPEG marker.');
              }
              callback(data);
            },
            'readAsArrayBuffer'
          )
        ) {
          callback(data);
        }
      };

      // Determines if meta data should be loaded automatically:
      loadImage$$1.hasMetaOption = function (options) {
        return options && options.meta
      };

      var originalTransform = loadImage$$1.transform;
      loadImage$$1.transform = function (img, options, callback, file, data) {
        if (loadImage$$1.hasMetaOption(options)) {
          loadImage$$1.parseMetaData(
            file,
            function (data) {
              originalTransform.call(loadImage$$1, img, options, callback, file, data);
            },
            options,
            data
          );
        } else {
          originalTransform.apply(loadImage$$1, arguments);
        }
      };
    });
    });

    var loadImageFetch = createCommonjsModule(function (module) {
    (function (factory) {
      if (typeof undefined === 'function' && undefined.amd) {
        // Register as an anonymous AMD module:
        undefined(['./load-image', './load-image-meta'], factory);
      } else if ('object' === 'object' && module.exports) {
        factory(loadImage, loadImageMeta);
      } else {
        // Browser globals:
        factory(window.loadImage);
      }
    })(function (loadImage$$1) {

      if (typeof fetch !== 'undefined' && typeof Request !== 'undefined') {
        loadImage$$1.fetchBlob = function (url, callback, options) {
          if (loadImage$$1.hasMetaOption(options)) {
            return fetch(new Request(url, options))
              .then(function (response) {
                return response.blob()
              })
              .then(callback)
              .catch(function (err) {
                console.log(err);
                callback();
              })
          } else {
            callback();
          }
        };
      }
    });
    });

    var loadImageExif = createCommonjsModule(function (module) {
    (function (factory) {
      if (typeof undefined === 'function' && undefined.amd) {
        // Register as an anonymous AMD module:
        undefined(['./load-image', './load-image-meta'], factory);
      } else if ('object' === 'object' && module.exports) {
        factory(loadImage, loadImageMeta);
      } else {
        // Browser globals:
        factory(window.loadImage);
      }
    })(function (loadImage$$1) {

      loadImage$$1.ExifMap = function () {
        return this
      };

      loadImage$$1.ExifMap.prototype.map = {
        Orientation: 0x0112
      };

      loadImage$$1.ExifMap.prototype.get = function (id) {
        return this[id] || this[this.map[id]]
      };

      loadImage$$1.getExifThumbnail = function (dataView, offset, length) {
        if (!length || offset + length > dataView.byteLength) {
          console.log('Invalid Exif data: Invalid thumbnail data.');
          return
        }
        return loadImage$$1.createObjectURL(
          new Blob([dataView.buffer.slice(offset, offset + length)])
        )
      };

      loadImage$$1.exifTagTypes = {
        // byte, 8-bit unsigned int:
        1: {
          getValue: function (dataView, dataOffset) {
            return dataView.getUint8(dataOffset)
          },
          size: 1
        },
        // ascii, 8-bit byte:
        2: {
          getValue: function (dataView, dataOffset) {
            return String.fromCharCode(dataView.getUint8(dataOffset))
          },
          size: 1,
          ascii: true
        },
        // short, 16 bit int:
        3: {
          getValue: function (dataView, dataOffset, littleEndian) {
            return dataView.getUint16(dataOffset, littleEndian)
          },
          size: 2
        },
        // long, 32 bit int:
        4: {
          getValue: function (dataView, dataOffset, littleEndian) {
            return dataView.getUint32(dataOffset, littleEndian)
          },
          size: 4
        },
        // rational = two long values, first is numerator, second is denominator:
        5: {
          getValue: function (dataView, dataOffset, littleEndian) {
            return (
              dataView.getUint32(dataOffset, littleEndian) /
              dataView.getUint32(dataOffset + 4, littleEndian)
            )
          },
          size: 8
        },
        // slong, 32 bit signed int:
        9: {
          getValue: function (dataView, dataOffset, littleEndian) {
            return dataView.getInt32(dataOffset, littleEndian)
          },
          size: 4
        },
        // srational, two slongs, first is numerator, second is denominator:
        10: {
          getValue: function (dataView, dataOffset, littleEndian) {
            return (
              dataView.getInt32(dataOffset, littleEndian) /
              dataView.getInt32(dataOffset + 4, littleEndian)
            )
          },
          size: 8
        }
      };
      // undefined, 8-bit byte, value depending on field:
      loadImage$$1.exifTagTypes[7] = loadImage$$1.exifTagTypes[1];

      loadImage$$1.getExifValue = function (
        dataView,
        tiffOffset,
        offset,
        type,
        length,
        littleEndian
      ) {
        var tagType = loadImage$$1.exifTagTypes[type];
        var tagSize;
        var dataOffset;
        var values;
        var i;
        var str;
        var c;
        if (!tagType) {
          console.log('Invalid Exif data: Invalid tag type.');
          return
        }
        tagSize = tagType.size * length;
        // Determine if the value is contained in the dataOffset bytes,
        // or if the value at the dataOffset is a pointer to the actual data:
        dataOffset =
          tagSize > 4
            ? tiffOffset + dataView.getUint32(offset + 8, littleEndian)
            : offset + 8;
        if (dataOffset + tagSize > dataView.byteLength) {
          console.log('Invalid Exif data: Invalid data offset.');
          return
        }
        if (length === 1) {
          return tagType.getValue(dataView, dataOffset, littleEndian)
        }
        values = [];
        for (i = 0; i < length; i += 1) {
          values[i] = tagType.getValue(
            dataView,
            dataOffset + i * tagType.size,
            littleEndian
          );
        }
        if (tagType.ascii) {
          str = '';
          // Concatenate the chars:
          for (i = 0; i < values.length; i += 1) {
            c = values[i];
            // Ignore the terminating NULL byte(s):
            if (c === '\u0000') {
              break
            }
            str += c;
          }
          return str
        }
        return values
      };

      loadImage$$1.parseExifTag = function (
        dataView,
        tiffOffset,
        offset,
        littleEndian,
        data
      ) {
        var tag = dataView.getUint16(offset, littleEndian);
        data.exif[tag] = loadImage$$1.getExifValue(
          dataView,
          tiffOffset,
          offset,
          dataView.getUint16(offset + 2, littleEndian), // tag type
          dataView.getUint32(offset + 4, littleEndian), // tag length
          littleEndian
        );
      };

      loadImage$$1.parseExifTags = function (
        dataView,
        tiffOffset,
        dirOffset,
        littleEndian,
        data
      ) {
        var tagsNumber, dirEndOffset, i;
        if (dirOffset + 6 > dataView.byteLength) {
          console.log('Invalid Exif data: Invalid directory offset.');
          return
        }
        tagsNumber = dataView.getUint16(dirOffset, littleEndian);
        dirEndOffset = dirOffset + 2 + 12 * tagsNumber;
        if (dirEndOffset + 4 > dataView.byteLength) {
          console.log('Invalid Exif data: Invalid directory size.');
          return
        }
        for (i = 0; i < tagsNumber; i += 1) {
          this.parseExifTag(
            dataView,
            tiffOffset,
            dirOffset + 2 + 12 * i, // tag offset
            littleEndian,
            data
          );
        }
        // Return the offset to the next directory:
        return dataView.getUint32(dirEndOffset, littleEndian)
      };

      loadImage$$1.parseExifData = function (dataView, offset, length, data, options) {
        if (options.disableExif) {
          return
        }
        var tiffOffset = offset + 10;
        var littleEndian;
        var dirOffset;
        var thumbnailData;
        // Check for the ASCII code for "Exif" (0x45786966):
        if (dataView.getUint32(offset + 4) !== 0x45786966) {
          // No Exif data, might be XMP data instead
          return
        }
        if (tiffOffset + 8 > dataView.byteLength) {
          console.log('Invalid Exif data: Invalid segment size.');
          return
        }
        // Check for the two null bytes:
        if (dataView.getUint16(offset + 8) !== 0x0000) {
          console.log('Invalid Exif data: Missing byte alignment offset.');
          return
        }
        // Check the byte alignment:
        switch (dataView.getUint16(tiffOffset)) {
          case 0x4949:
            littleEndian = true;
            break
          case 0x4d4d:
            littleEndian = false;
            break
          default:
            console.log('Invalid Exif data: Invalid byte alignment marker.');
            return
        }
        // Check for the TIFF tag marker (0x002A):
        if (dataView.getUint16(tiffOffset + 2, littleEndian) !== 0x002a) {
          console.log('Invalid Exif data: Missing TIFF marker.');
          return
        }
        // Retrieve the directory offset bytes, usually 0x00000008 or 8 decimal:
        dirOffset = dataView.getUint32(tiffOffset + 4, littleEndian);
        // Create the exif object to store the tags:
        data.exif = new loadImage$$1.ExifMap();
        // Parse the tags of the main image directory and retrieve the
        // offset to the next directory, usually the thumbnail directory:
        dirOffset = loadImage$$1.parseExifTags(
          dataView,
          tiffOffset,
          tiffOffset + dirOffset,
          littleEndian,
          data
        );
        if (dirOffset && !options.disableExifThumbnail) {
          thumbnailData = { exif: {} };
          dirOffset = loadImage$$1.parseExifTags(
            dataView,
            tiffOffset,
            tiffOffset + dirOffset,
            littleEndian,
            thumbnailData
          );
          // Check for JPEG Thumbnail offset:
          if (thumbnailData.exif[0x0201]) {
            data.exif.Thumbnail = loadImage$$1.getExifThumbnail(
              dataView,
              tiffOffset + thumbnailData.exif[0x0201],
              thumbnailData.exif[0x0202] // Thumbnail data length
            );
          }
        }
        // Check for Exif Sub IFD Pointer:
        if (data.exif[0x8769] && !options.disableExifSub) {
          loadImage$$1.parseExifTags(
            dataView,
            tiffOffset,
            tiffOffset + data.exif[0x8769], // directory offset
            littleEndian,
            data
          );
        }
        // Check for GPS Info IFD Pointer:
        if (data.exif[0x8825] && !options.disableExifGps) {
          loadImage$$1.parseExifTags(
            dataView,
            tiffOffset,
            tiffOffset + data.exif[0x8825], // directory offset
            littleEndian,
            data
          );
        }
      };

      // Registers the Exif parser for the APP1 JPEG meta data segment:
      loadImage$$1.metaDataParsers.jpeg[0xffe1].push(loadImage$$1.parseExifData);

      // Adds the following properties to the parseMetaData callback data:
      // * exif: The exif tags, parsed by the parseExifData method

      // Adds the following options to the parseMetaData method:
      // * disableExif: Disables Exif parsing.
      // * disableExifThumbnail: Disables parsing of the Exif Thumbnail.
      // * disableExifSub: Disables parsing of the Exif Sub IFD.
      // * disableExifGps: Disables parsing of the Exif GPS Info IFD.
    });
    });

    var loadImageExifMap = createCommonjsModule(function (module) {
    (function (factory) {
      if (typeof undefined === 'function' && undefined.amd) {
        // Register as an anonymous AMD module:
        undefined(['./load-image', './load-image-exif'], factory);
      } else if ('object' === 'object' && module.exports) {
        factory(loadImage, loadImageExif);
      } else {
        // Browser globals:
        factory(window.loadImage);
      }
    })(function (loadImage$$1) {

      loadImage$$1.ExifMap.prototype.tags = {
        // =================
        // TIFF tags (IFD0):
        // =================
        0x0100: 'ImageWidth',
        0x0101: 'ImageHeight',
        0x8769: 'ExifIFDPointer',
        0x8825: 'GPSInfoIFDPointer',
        0xa005: 'InteroperabilityIFDPointer',
        0x0102: 'BitsPerSample',
        0x0103: 'Compression',
        0x0106: 'PhotometricInterpretation',
        0x0112: 'Orientation',
        0x0115: 'SamplesPerPixel',
        0x011c: 'PlanarConfiguration',
        0x0212: 'YCbCrSubSampling',
        0x0213: 'YCbCrPositioning',
        0x011a: 'XResolution',
        0x011b: 'YResolution',
        0x0128: 'ResolutionUnit',
        0x0111: 'StripOffsets',
        0x0116: 'RowsPerStrip',
        0x0117: 'StripByteCounts',
        0x0201: 'JPEGInterchangeFormat',
        0x0202: 'JPEGInterchangeFormatLength',
        0x012d: 'TransferFunction',
        0x013e: 'WhitePoint',
        0x013f: 'PrimaryChromaticities',
        0x0211: 'YCbCrCoefficients',
        0x0214: 'ReferenceBlackWhite',
        0x0132: 'DateTime',
        0x010e: 'ImageDescription',
        0x010f: 'Make',
        0x0110: 'Model',
        0x0131: 'Software',
        0x013b: 'Artist',
        0x8298: 'Copyright',
        // ==================
        // Exif Sub IFD tags:
        // ==================
        0x9000: 'ExifVersion', // EXIF version
        0xa000: 'FlashpixVersion', // Flashpix format version
        0xa001: 'ColorSpace', // Color space information tag
        0xa002: 'PixelXDimension', // Valid width of meaningful image
        0xa003: 'PixelYDimension', // Valid height of meaningful image
        0xa500: 'Gamma',
        0x9101: 'ComponentsConfiguration', // Information about channels
        0x9102: 'CompressedBitsPerPixel', // Compressed bits per pixel
        0x927c: 'MakerNote', // Any desired information written by the manufacturer
        0x9286: 'UserComment', // Comments by user
        0xa004: 'RelatedSoundFile', // Name of related sound file
        0x9003: 'DateTimeOriginal', // Date and time when the original image was generated
        0x9004: 'DateTimeDigitized', // Date and time when the image was stored digitally
        0x9290: 'SubSecTime', // Fractions of seconds for DateTime
        0x9291: 'SubSecTimeOriginal', // Fractions of seconds for DateTimeOriginal
        0x9292: 'SubSecTimeDigitized', // Fractions of seconds for DateTimeDigitized
        0x829a: 'ExposureTime', // Exposure time (in seconds)
        0x829d: 'FNumber',
        0x8822: 'ExposureProgram', // Exposure program
        0x8824: 'SpectralSensitivity', // Spectral sensitivity
        0x8827: 'PhotographicSensitivity', // EXIF 2.3, ISOSpeedRatings in EXIF 2.2
        0x8828: 'OECF', // Optoelectric conversion factor
        0x8830: 'SensitivityType',
        0x8831: 'StandardOutputSensitivity',
        0x8832: 'RecommendedExposureIndex',
        0x8833: 'ISOSpeed',
        0x8834: 'ISOSpeedLatitudeyyy',
        0x8835: 'ISOSpeedLatitudezzz',
        0x9201: 'ShutterSpeedValue', // Shutter speed
        0x9202: 'ApertureValue', // Lens aperture
        0x9203: 'BrightnessValue', // Value of brightness
        0x9204: 'ExposureBias', // Exposure bias
        0x9205: 'MaxApertureValue', // Smallest F number of lens
        0x9206: 'SubjectDistance', // Distance to subject in meters
        0x9207: 'MeteringMode', // Metering mode
        0x9208: 'LightSource', // Kind of light source
        0x9209: 'Flash', // Flash status
        0x9214: 'SubjectArea', // Location and area of main subject
        0x920a: 'FocalLength', // Focal length of the lens in mm
        0xa20b: 'FlashEnergy', // Strobe energy in BCPS
        0xa20c: 'SpatialFrequencyResponse',
        0xa20e: 'FocalPlaneXResolution', // Number of pixels in width direction per FPRUnit
        0xa20f: 'FocalPlaneYResolution', // Number of pixels in height direction per FPRUnit
        0xa210: 'FocalPlaneResolutionUnit', // Unit for measuring the focal plane resolution
        0xa214: 'SubjectLocation', // Location of subject in image
        0xa215: 'ExposureIndex', // Exposure index selected on camera
        0xa217: 'SensingMethod', // Image sensor type
        0xa300: 'FileSource', // Image source (3 == DSC)
        0xa301: 'SceneType', // Scene type (1 == directly photographed)
        0xa302: 'CFAPattern', // Color filter array geometric pattern
        0xa401: 'CustomRendered', // Special processing
        0xa402: 'ExposureMode', // Exposure mode
        0xa403: 'WhiteBalance', // 1 = auto white balance, 2 = manual
        0xa404: 'DigitalZoomRatio', // Digital zoom ratio
        0xa405: 'FocalLengthIn35mmFilm',
        0xa406: 'SceneCaptureType', // Type of scene
        0xa407: 'GainControl', // Degree of overall image gain adjustment
        0xa408: 'Contrast', // Direction of contrast processing applied by camera
        0xa409: 'Saturation', // Direction of saturation processing applied by camera
        0xa40a: 'Sharpness', // Direction of sharpness processing applied by camera
        0xa40b: 'DeviceSettingDescription',
        0xa40c: 'SubjectDistanceRange', // Distance to subject
        0xa420: 'ImageUniqueID', // Identifier assigned uniquely to each image
        0xa430: 'CameraOwnerName',
        0xa431: 'BodySerialNumber',
        0xa432: 'LensSpecification',
        0xa433: 'LensMake',
        0xa434: 'LensModel',
        0xa435: 'LensSerialNumber',
        // ==============
        // GPS Info tags:
        // ==============
        0x0000: 'GPSVersionID',
        0x0001: 'GPSLatitudeRef',
        0x0002: 'GPSLatitude',
        0x0003: 'GPSLongitudeRef',
        0x0004: 'GPSLongitude',
        0x0005: 'GPSAltitudeRef',
        0x0006: 'GPSAltitude',
        0x0007: 'GPSTimeStamp',
        0x0008: 'GPSSatellites',
        0x0009: 'GPSStatus',
        0x000a: 'GPSMeasureMode',
        0x000b: 'GPSDOP',
        0x000c: 'GPSSpeedRef',
        0x000d: 'GPSSpeed',
        0x000e: 'GPSTrackRef',
        0x000f: 'GPSTrack',
        0x0010: 'GPSImgDirectionRef',
        0x0011: 'GPSImgDirection',
        0x0012: 'GPSMapDatum',
        0x0013: 'GPSDestLatitudeRef',
        0x0014: 'GPSDestLatitude',
        0x0015: 'GPSDestLongitudeRef',
        0x0016: 'GPSDestLongitude',
        0x0017: 'GPSDestBearingRef',
        0x0018: 'GPSDestBearing',
        0x0019: 'GPSDestDistanceRef',
        0x001a: 'GPSDestDistance',
        0x001b: 'GPSProcessingMethod',
        0x001c: 'GPSAreaInformation',
        0x001d: 'GPSDateStamp',
        0x001e: 'GPSDifferential',
        0x001f: 'GPSHPositioningError'
      };

      loadImage$$1.ExifMap.prototype.stringValues = {
        ExposureProgram: {
          0: 'Undefined',
          1: 'Manual',
          2: 'Normal program',
          3: 'Aperture priority',
          4: 'Shutter priority',
          5: 'Creative program',
          6: 'Action program',
          7: 'Portrait mode',
          8: 'Landscape mode'
        },
        MeteringMode: {
          0: 'Unknown',
          1: 'Average',
          2: 'CenterWeightedAverage',
          3: 'Spot',
          4: 'MultiSpot',
          5: 'Pattern',
          6: 'Partial',
          255: 'Other'
        },
        LightSource: {
          0: 'Unknown',
          1: 'Daylight',
          2: 'Fluorescent',
          3: 'Tungsten (incandescent light)',
          4: 'Flash',
          9: 'Fine weather',
          10: 'Cloudy weather',
          11: 'Shade',
          12: 'Daylight fluorescent (D 5700 - 7100K)',
          13: 'Day white fluorescent (N 4600 - 5400K)',
          14: 'Cool white fluorescent (W 3900 - 4500K)',
          15: 'White fluorescent (WW 3200 - 3700K)',
          17: 'Standard light A',
          18: 'Standard light B',
          19: 'Standard light C',
          20: 'D55',
          21: 'D65',
          22: 'D75',
          23: 'D50',
          24: 'ISO studio tungsten',
          255: 'Other'
        },
        Flash: {
          0x0000: 'Flash did not fire',
          0x0001: 'Flash fired',
          0x0005: 'Strobe return light not detected',
          0x0007: 'Strobe return light detected',
          0x0009: 'Flash fired, compulsory flash mode',
          0x000d: 'Flash fired, compulsory flash mode, return light not detected',
          0x000f: 'Flash fired, compulsory flash mode, return light detected',
          0x0010: 'Flash did not fire, compulsory flash mode',
          0x0018: 'Flash did not fire, auto mode',
          0x0019: 'Flash fired, auto mode',
          0x001d: 'Flash fired, auto mode, return light not detected',
          0x001f: 'Flash fired, auto mode, return light detected',
          0x0020: 'No flash function',
          0x0041: 'Flash fired, red-eye reduction mode',
          0x0045: 'Flash fired, red-eye reduction mode, return light not detected',
          0x0047: 'Flash fired, red-eye reduction mode, return light detected',
          0x0049: 'Flash fired, compulsory flash mode, red-eye reduction mode',
          0x004d: 'Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected',
          0x004f: 'Flash fired, compulsory flash mode, red-eye reduction mode, return light detected',
          0x0059: 'Flash fired, auto mode, red-eye reduction mode',
          0x005d: 'Flash fired, auto mode, return light not detected, red-eye reduction mode',
          0x005f: 'Flash fired, auto mode, return light detected, red-eye reduction mode'
        },
        SensingMethod: {
          1: 'Undefined',
          2: 'One-chip color area sensor',
          3: 'Two-chip color area sensor',
          4: 'Three-chip color area sensor',
          5: 'Color sequential area sensor',
          7: 'Trilinear sensor',
          8: 'Color sequential linear sensor'
        },
        SceneCaptureType: {
          0: 'Standard',
          1: 'Landscape',
          2: 'Portrait',
          3: 'Night scene'
        },
        SceneType: {
          1: 'Directly photographed'
        },
        CustomRendered: {
          0: 'Normal process',
          1: 'Custom process'
        },
        WhiteBalance: {
          0: 'Auto white balance',
          1: 'Manual white balance'
        },
        GainControl: {
          0: 'None',
          1: 'Low gain up',
          2: 'High gain up',
          3: 'Low gain down',
          4: 'High gain down'
        },
        Contrast: {
          0: 'Normal',
          1: 'Soft',
          2: 'Hard'
        },
        Saturation: {
          0: 'Normal',
          1: 'Low saturation',
          2: 'High saturation'
        },
        Sharpness: {
          0: 'Normal',
          1: 'Soft',
          2: 'Hard'
        },
        SubjectDistanceRange: {
          0: 'Unknown',
          1: 'Macro',
          2: 'Close view',
          3: 'Distant view'
        },
        FileSource: {
          3: 'DSC'
        },
        ComponentsConfiguration: {
          0: '',
          1: 'Y',
          2: 'Cb',
          3: 'Cr',
          4: 'R',
          5: 'G',
          6: 'B'
        },
        Orientation: {
          1: 'top-left',
          2: 'top-right',
          3: 'bottom-right',
          4: 'bottom-left',
          5: 'left-top',
          6: 'right-top',
          7: 'right-bottom',
          8: 'left-bottom'
        }
      };

      loadImage$$1.ExifMap.prototype.getText = function (id) {
        var value = this.get(id);
        switch (id) {
          case 'LightSource':
          case 'Flash':
          case 'MeteringMode':
          case 'ExposureProgram':
          case 'SensingMethod':
          case 'SceneCaptureType':
          case 'SceneType':
          case 'CustomRendered':
          case 'WhiteBalance':
          case 'GainControl':
          case 'Contrast':
          case 'Saturation':
          case 'Sharpness':
          case 'SubjectDistanceRange':
          case 'FileSource':
          case 'Orientation':
            return this.stringValues[id][value]
          case 'ExifVersion':
          case 'FlashpixVersion':
            if (!value) return
            return String.fromCharCode(value[0], value[1], value[2], value[3])
          case 'ComponentsConfiguration':
            if (!value) return
            return (
              this.stringValues[id][value[0]] +
              this.stringValues[id][value[1]] +
              this.stringValues[id][value[2]] +
              this.stringValues[id][value[3]]
            )
          case 'GPSVersionID':
            if (!value) return
            return value[0] + '.' + value[1] + '.' + value[2] + '.' + value[3]
        }
        return String(value)
      }
      ;(function (exifMapPrototype) {
        var tags = exifMapPrototype.tags;
        var map = exifMapPrototype.map;
        var prop;
        // Map the tag names to tags:
        for (prop in tags) {
          if (tags.hasOwnProperty(prop)) {
            map[tags[prop]] = prop;
          }
        }
      })(loadImage$$1.ExifMap.prototype);

      loadImage$$1.ExifMap.prototype.getAll = function () {
        var map = {};
        var prop;
        var id;
        for (prop in this) {
          if (this.hasOwnProperty(prop)) {
            id = this.tags[prop];
            if (id) {
              map[id] = this.getText(id);
            }
          }
        }
        return map
      };
    });
    });

    var loadImageOrientation = createCommonjsModule(function (module) {
    (function (factory) {
      if (typeof undefined === 'function' && undefined.amd) {
        // Register as an anonymous AMD module:
        undefined(['./load-image', './load-image-scale', './load-image-meta'], factory);
      } else if ('object' === 'object' && module.exports) {
        factory(
          loadImage,
          loadImageScale,
          loadImageMeta
        );
      } else {
        // Browser globals:
        factory(window.loadImage);
      }
    })(function (loadImage$$1) {

      var originalHasCanvasOption = loadImage$$1.hasCanvasOption;
      var originalHasMetaOption = loadImage$$1.hasMetaOption;
      var originalTransformCoordinates = loadImage$$1.transformCoordinates;
      var originalGetTransformedOptions = loadImage$$1.getTransformedOptions;

      // Determines if the target image should be a canvas element:
      loadImage$$1.hasCanvasOption = function (options) {
        return (
          !!options.orientation || originalHasCanvasOption.call(loadImage$$1, options)
        )
      };

      // Determines if meta data should be loaded automatically:
      loadImage$$1.hasMetaOption = function (options) {
        return (
          (options && options.orientation === true) ||
          originalHasMetaOption.call(loadImage$$1, options)
        )
      };

      // Transform image orientation based on
      // the given EXIF orientation option:
      loadImage$$1.transformCoordinates = function (canvas, options) {
        originalTransformCoordinates.call(loadImage$$1, canvas, options);
        var ctx = canvas.getContext('2d');
        var width = canvas.width;
        var height = canvas.height;
        var styleWidth = canvas.style.width;
        var styleHeight = canvas.style.height;
        var orientation = options.orientation;
        if (!orientation || orientation > 8) {
          return
        }
        if (orientation > 4) {
          canvas.width = height;
          canvas.height = width;
          canvas.style.width = styleHeight;
          canvas.style.height = styleWidth;
        }
        switch (orientation) {
          case 2:
            // horizontal flip
            ctx.translate(width, 0);
            ctx.scale(-1, 1);
            break
          case 3:
            // 180° rotate left
            ctx.translate(width, height);
            ctx.rotate(Math.PI);
            break
          case 4:
            // vertical flip
            ctx.translate(0, height);
            ctx.scale(1, -1);
            break
          case 5:
            // vertical flip + 90 rotate right
            ctx.rotate(0.5 * Math.PI);
            ctx.scale(1, -1);
            break
          case 6:
            // 90° rotate right
            ctx.rotate(0.5 * Math.PI);
            ctx.translate(0, -height);
            break
          case 7:
            // horizontal flip + 90 rotate right
            ctx.rotate(0.5 * Math.PI);
            ctx.translate(width, -height);
            ctx.scale(-1, 1);
            break
          case 8:
            // 90° rotate left
            ctx.rotate(-0.5 * Math.PI);
            ctx.translate(-width, 0);
            break
        }
      };

      // Transforms coordinate and dimension options
      // based on the given orientation option:
      loadImage$$1.getTransformedOptions = function (img, opts, data) {
        var options = originalGetTransformedOptions.call(loadImage$$1, img, opts);
        var orientation = options.orientation;
        var newOptions;
        var i;
        if (orientation === true && data && data.exif) {
          orientation = data.exif.get('Orientation');
        }
        if (!orientation || orientation > 8 || orientation === 1) {
          return options
        }
        newOptions = {};
        for (i in options) {
          if (options.hasOwnProperty(i)) {
            newOptions[i] = options[i];
          }
        }
        newOptions.orientation = orientation;
        switch (orientation) {
          case 2:
            // horizontal flip
            newOptions.left = options.right;
            newOptions.right = options.left;
            break
          case 3:
            // 180° rotate left
            newOptions.left = options.right;
            newOptions.top = options.bottom;
            newOptions.right = options.left;
            newOptions.bottom = options.top;
            break
          case 4:
            // vertical flip
            newOptions.top = options.bottom;
            newOptions.bottom = options.top;
            break
          case 5:
            // vertical flip + 90 rotate right
            newOptions.left = options.top;
            newOptions.top = options.left;
            newOptions.right = options.bottom;
            newOptions.bottom = options.right;
            break
          case 6:
            // 90° rotate right
            newOptions.left = options.top;
            newOptions.top = options.right;
            newOptions.right = options.bottom;
            newOptions.bottom = options.left;
            break
          case 7:
            // horizontal flip + 90 rotate right
            newOptions.left = options.bottom;
            newOptions.top = options.right;
            newOptions.right = options.top;
            newOptions.bottom = options.left;
            break
          case 8:
            // 90° rotate left
            newOptions.left = options.bottom;
            newOptions.top = options.left;
            newOptions.right = options.top;
            newOptions.bottom = options.right;
            break
        }
        if (newOptions.orientation > 4) {
          newOptions.maxWidth = options.maxHeight;
          newOptions.maxHeight = options.maxWidth;
          newOptions.minWidth = options.minHeight;
          newOptions.minHeight = options.minWidth;
          newOptions.sourceWidth = options.sourceHeight;
          newOptions.sourceHeight = options.sourceWidth;
        }
        return newOptions
      };
    });
    });

    var js = loadImage;

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * 压缩图片
     * @param {?} file
     * @param {?} option
     * @return {?}
     */
    function zipToImage(file, option) {
        return new Promise(function (resolve, reject) {
            js(file, function (canvas) {
                if (canvas.toBlob) {
                    canvas.toBlob(function (blob) {
                        var /** @type {?} */ thumbnail = canvas.toDataURL('image/png');
                        blob.lastModifiedDate = new Date();
                        blob.lastModified = blob.lastModifiedDate.getTime();
                        resolve({ thumbnail: thumbnail, blob: blob });
                    });
                }
                else {
                    reject('HTMLCanvasElement toBlob function is undefined');
                }
            }, option);
        });
    }
    var /** @type {?} */ uniqueId = 0;
    var /** @type {?} */ NtPictureAccepts = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp'];
    var NtPicture = /** @class */ (function (_super) {
        __extends(NtPicture, _super);
        function NtPicture() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.id = "nt-picture-" + uniqueId++;
            return _this;
        }
        return NtPicture;
    }(upload.NtUploadFile));
    var NtPictureComponent = /** @class */ (function (_super) {
        __extends(NtPictureComponent, _super);
        function NtPictureComponent(_modal, uploader, ngControl) {
            var _this = _super.call(this, uploader, ngControl) || this;
            _this._modal = _modal;
            _this._destroy = new Subject.Subject();
            _this._disabled = false;
            _this._required = false;
            _this._autoupload = true;
            _this._value = [];
            _this._maxFiles = 1;
            _this._maxSize = 5;
            _this._accept = NtPictureAccepts;
            _this.files = [];
            _this.url = '';
            _this.name = '';
            _this.error = new core.EventEmitter();
            _this.remove = new core.EventEmitter();
            return _this;
        }
        Object.defineProperty(NtPictureComponent.prototype, "value", {
            get: /**
             * @return {?}
             */
            function () { return this._value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtPictureComponent.prototype, "disabled", {
            get: /**
             * @return {?}
             */
            function () { return this._disabled; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._disabled = coercion.coerceBooleanProperty(value); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtPictureComponent.prototype, "required", {
            get: /**
             * @return {?}
             */
            function () { return this._required; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._required = coercion.coerceBooleanProperty(value); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtPictureComponent.prototype, "accept", {
            get: /**
             * @return {?}
             */
            function () { return this._accept; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (typeof value === 'string') {
                    if (value === '*') {
                        this._accept = NtPictureAccepts;
                    }
                    else {
                        this._accept = value.replace(' ', '').split(',').filter(function (accept) { return NtPictureAccepts.indexOf(accept) > -1; });
                    }
                }
                else {
                    this._accept = coercion.coerceArray(value).filter(function (accept) { return NtPictureAccepts.indexOf(accept) > -1; });
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtPictureComponent.prototype, "maxSize", {
            get: /**
             * @return {?}
             */
            function () { return this._maxSize; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._maxSize = coercion.coerceNumberProperty(value, 5); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtPictureComponent.prototype, "maxFiles", {
            get: /**
             * @return {?}
             */
            function () { return this._maxFiles; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._maxFiles = coercion.coerceNumberProperty(value, 1); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NtPictureComponent.prototype, "autoupload", {
            get: /**
             * @return {?}
             */
            function () { return this._autoupload; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._autoupload = coercion.coerceBooleanProperty(value); },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NtPictureComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () { };
        /**
         * @return {?}
         */
        NtPictureComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this._destroy.next();
            this._destroy.complete();
            this.error.complete();
            this.remove.complete();
        };
        /**
         * @return {?}
         */
        NtPictureComponent.prototype.onTriggerClick = /**
         * @return {?}
         */
        function () {
            if (this.files.length < this.maxFiles) {
                this.fileElement.nativeElement.click();
            }
        };
        /**
         * @return {?}
         */
        NtPictureComponent.prototype._fileChanged = /**
         * @return {?}
         */
        function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var file, ntFile_1, loadImageOptions, data, handlers;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            file = this.fileElement.nativeElement.files[0];
                            if (!(file && this.files.length < this.maxFiles)) return [3 /*break*/, 2];
                            if (!this._fileSizeValid(file)) {
                                this.error.next(new upload.NtFileSizeError(file, this.maxSize * 1024 * 1024, this.maxSize + "MB"));
                                return [2 /*return*/];
                            }
                            if (!this._fileTypeValid(file)) {
                                this.error.next(new upload.NtFileAcceptError(file, file.type));
                                return [2 /*return*/];
                            }
                            ntFile_1 = new NtPicture(file.name, file.size, file.type);
                            loadImageOptions = { maxWidth: 1080, orientation: true, canvas: true };
                            return [4 /*yield*/, zipToImage(file, loadImageOptions)];
                        case 1:
                            data = _a.sent();
                            ntFile_1.thumbnail = data.thumbnail;
                            this.files.push(ntFile_1);
                            handlers = {
                                begin: function () { return _this._onUploadBegin(ntFile_1); },
                                progress: function (event) { return _this._onUploadProgress(event, ntFile_1); },
                                done: function () { return _this._onUploadDone(ntFile_1); }
                            };
                            if (this.autoupload) {
                                ntFile_1.uploader = this._uploader.upload(this.url, this._getFormData(file), handlers)
                                    .pipe(operators.takeUntil(this._destroy))
                                    .subscribe(function (result) {
                                    if ((ntFile_1.status = result.status) === upload.NtUploadStatus.SUCCESS) {
                                        ntFile_1.data = result.data;
                                        _this._value.push(ntFile_1);
                                        _this._onChange(_this._value);
                                    }
                                }, function (error) {
                                    ntFile_1.status = upload.NtUploadStatus.ERROR;
                                    ntFile_1.error = error.statusText;
                                    ntFile_1.progress = 100;
                                    _this.error.next(new upload.NtFileUploadError(error.status, error.statusText));
                                });
                            }
                            _a.label = 2;
                        case 2:
                            this._onTouched && this._onTouched();
                            this.fileElement.nativeElement.value = '';
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param {?} file
         * @return {?}
         */
        NtPictureComponent.prototype.removeFile = /**
         * @param {?} file
         * @return {?}
         */
        function (file) {
            if (this.disabled) {
                return;
            }
            file.uploader && file.uploader.unsubscribe();
            var /** @type {?} */ vindex = this._value.indexOf(file);
            vindex > -1 && this._value.splice(vindex, 1);
            var /** @type {?} */ findex = this.files.indexOf(file);
            findex > -1 && this.files.splice(vindex, 1);
            this.remove.next(file);
            this._onChange(this._value);
        };
        /**
         * @param {?} file
         * @return {?}
         */
        NtPictureComponent.prototype.preview = /**
         * @param {?} file
         * @return {?}
         */
        function (file) {
            var /** @type {?} */ modal$$1 = this._modal.open(this.previewTemplate, {
                data: file,
                centerVertically: true,
                maxWidth: '90vw',
                maxHeight: '90vh'
            });
        };
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        NtPictureComponent.prototype.setDisabledState = /**
         * @param {?} isDisabled
         * @return {?}
         */
        function (isDisabled) {
            this._disabled = isDisabled;
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NtPictureComponent.prototype.setValue = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._value.length = 0;
                (_a = this._value).push.apply(_a, value);
                this.files.length = 0;
                (_b = this.files).push.apply(_b, this._value);
            }
            var _a, _b;
        };
        /**
         * @param {?} file
         * @return {?}
         */
        NtPictureComponent.prototype._fileTypeValid = /**
         * @param {?} file
         * @return {?}
         */
        function (file) {
            if (file) {
                return this.accept.indexOf(file.type) > -1 || this.accept.indexOf('*') > -1;
            }
            return false;
        };
        /**
         * @param {?} file
         * @return {?}
         */
        NtPictureComponent.prototype._fileSizeValid = /**
         * @param {?} file
         * @return {?}
         */
        function (file) {
            if (file) {
                return file.size <= this.maxSize * 1024 * 1024;
            }
            return false;
        };
        /**
         * @param {?} file
         * @return {?}
         */
        NtPictureComponent.prototype._onUploadBegin = /**
         * @param {?} file
         * @return {?}
         */
        function (file) {
            file.status = upload.NtUploadStatus.SENDING;
        };
        /**
         * @param {?} event
         * @param {?} file
         * @return {?}
         */
        NtPictureComponent.prototype._onUploadProgress = /**
         * @param {?} event
         * @param {?} file
         * @return {?}
         */
        function (event, file) {
            if (event.total && event.total > 0) {
                file.progress = Math.round(event.loaded / event.total * 100);
            }
        };
        /**
         * @param {?} file
         * @return {?}
         */
        NtPictureComponent.prototype._onUploadDone = /**
         * @param {?} file
         * @return {?}
         */
        function (file) {
            file.status = upload.NtUploadStatus.SUCCESS;
        };
        NtPictureComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'nt-picture',
                        template: "<input #fileElement type=\"file\" [accept]=\"accept\" (change)=\"_fileChanged()\"> <div class=\"nt-picture-item\" *ngFor=\"let file of files\" [style.backgroundImage]=\"'url(' + file.thumbnail + ')'\"> <div class=\"nt-picture-action\" *ngIf=\"file.status >= 2 && !disabled\"> <nt-ant-icon type=\"search1\" (click)=\"preview(file)\"></nt-ant-icon> <nt-ant-icon type=\"delete\" (click)=\"removeFile(file)\"></nt-ant-icon> </div> <div class=\"nt-picture-progress\" *ngIf=\"file.status === 1\" [@fadeOut]> <nt-progress *ngIf=\"file.status === 1\" [value]=\"file.progress\" size=\"tiny\" color=\"success\"></nt-progress> </div> </div> <div class=\"nt-picture-add\" (click)=\"onTriggerClick()\" *ngIf=\"this.files.length < maxFiles && !disabled\"> <nt-ant-icon type=\"plus\"></nt-ant-icon> </div> <ng-template #previewTemplate let-data> <div class=\"nt-picture-preview\"> <img [src]=\"data.link || data.thumbnail\"> </div> </ng-template> ",
                        host: {
                            'class': 'nt-form-control nt-picture'
                        },
                        encapsulation: core.ViewEncapsulation.None,
                        providers: [
                            { provide: forms$1.NtFormFieldControl, useExisting: NtPictureComponent }
                        ],
                        animations: [
                            animations.trigger('fade', [
                                animations.transition('* => void', fading.fadeOut(.3)),
                                animations.transition('void => *', fading.fadeIn(.3))
                            ]),
                            animations.trigger('fadeOut', [
                                animations.transition('* => void', fading.fadeOut(.3))
                            ])
                        ]
                    },] },
        ];
        /** @nocollapse */
        NtPictureComponent.ctorParameters = function () { return [
            { type: modal.NtModal, },
            { type: upload.NtUpload, },
            { type: forms.NgControl, decorators: [{ type: core.Self }, { type: core.Optional },] },
        ]; };
        NtPictureComponent.propDecorators = {
            "url": [{ type: core.Input },],
            "name": [{ type: core.Input },],
            "disabled": [{ type: core.Input },],
            "required": [{ type: core.Input },],
            "accept": [{ type: core.Input },],
            "maxSize": [{ type: core.Input },],
            "maxFiles": [{ type: core.Input },],
            "autoupload": [{ type: core.Input },],
            "fileElement": [{ type: core.ViewChild, args: ['fileElement',] },],
            "previewTemplate": [{ type: core.ViewChild, args: ['previewTemplate',] },],
            "error": [{ type: core.Output },],
            "remove": [{ type: core.Output },],
        };
        return NtPictureComponent;
    }(upload.NtUploadControl));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NtPictureModule = /** @class */ (function () {
        function NtPictureModule() {
        }
        NtPictureModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, modal.NtModalModule, upload.NtUploadModule, progress.NtProgressModule, icon.NtIconModule],
                        exports: [NtPictureComponent],
                        declarations: [NtPictureComponent],
                    },] },
        ];
        /** @nocollapse */
        NtPictureModule.ctorParameters = function () { return []; };
        return NtPictureModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.NtPictureModule = NtPictureModule;
    exports.zipToImage = zipToImage;
    exports.NtPictureAccepts = NtPictureAccepts;
    exports.NtPicture = NtPicture;
    exports.NtPictureComponent = NtPictureComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=picture.umd.js.map
