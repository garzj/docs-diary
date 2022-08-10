# GNU Make

If you want to use GNU make on Windows, I suggest you use [Chocolatey](https://chocolatey.org/) for installation.

## Install make and mingw

```bash
choco install mingw make -y
```

## Example Makefile

This is an example `Makefile` for a cross-platform `C++` project.

```makefile title='Makefile'
name = out

rwildcard = $(wildcard $(addsuffix $2, $1)) $(foreach d,$(wildcard $(addsuffix *, $1)),$(call rwildcard,$d/,$2))
cpp_files := $(call rwildcard,src/,*.cpp)

ifeq ($(OS),Windows_NT)
	out_binary = $(name).exe
else
	out_binary = $(name)
endif

all: $(name)

$(name): $(cpp_files)
	g++ \
		-o $(name) $(cpp_files) \
		-lgdi32

clean:
	rm -f $(out_binary) || del $(out_binary)

run:
	./$(out_binary) || $(out_binary)

dll-dump:
	objdump -p $(name).* | (grep "DLL Name:" || findstr "DLL Name:")

dev: $(name) run

watch:
	nodemon --watch ./src/** --ext cpp,hpp,c,h --exec make dev
```
